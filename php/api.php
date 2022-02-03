<?PHP

class API {

    protected $api = 'https://pocketnet.app:8899/';

	public function __construct ($proxypath)
	{
        if (isset($proxypath)){
            $this->api = $proxypath;
        }
            
	}
	public function __destruct ()
	{

    }

    private function prepareRequest($procedure, array $params = array())
    {
        $payload = array();
    
        if (!empty($params)) {
            $payload = $params;
        }
    
        return $payload;
    }
  

    private function curl($url, $fields){


        $ch = curl_init();

        curl_setopt($ch,CURLOPT_URL, $url);
        curl_setopt($ch,CURLOPT_POST, count($fields));
        curl_setopt($ch, CURLOPT_HTTPHEADER, Array("Content-type: application/json"));
        curl_setopt($ch,CURLOPT_POSTFIELDS, json_encode($fields));
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result = curl_exec($ch);
        //echo curl_error($ch);
        curl_close($ch);

        if ($result != false){

            if (strpos($result, 'Cannot POST') !== false) {
                return array();
            }

            $result = JSON_decode($result);

            if ($result->result != null){
                $result = $result->data;
            }
            else{
                $result = false;
            }
        }
        else{
            return array();
        }

        return $result;
    }

	public function send($action, $params){
        $fields = $this->prepareRequest($action, $params);
        
        $url = $this->api.$action;

        return $this->curl($url, $fields);
    }

    public function peertubeinfo($host, $id){


        $action = 'peertube/video';
        $params = array('url' => 'peertube://' . $host . '/' . $id);

        $data = $this->send($action, $params);

        if(isset($data->data)){
            return $data->data;
        }

        return array();
    }
	
}