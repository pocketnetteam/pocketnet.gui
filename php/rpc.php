<?PHP

class RPC {

    protected $node = 'https://pocketnet.app:8899/rpc/';

	public function __construct ($proxypath)
	{
		if (isset($proxypath)){
            $this->node = $proxypath;
        }
	}
	public function __destruct ()
	{

    }
    
    private function prepareRequest($procedure, array $params = array())
    {
        $payload = array(
            'method' => $procedure,
        );
    
        if (!empty($params)) {
            $payload['parameters'] = $params;
        }
    
        return $payload;
    }

    private function curl($url, $fields){


        $ch = curl_init();
 
        curl_setopt($ch,CURLOPT_URL, $url);
        curl_setopt($ch,CURLOPT_POST, count($fields));
        curl_setopt($ch, CURLOPT_HTTPHEADER, Array("Content-type: application/json", "x-no-compression: 1"));
        curl_setopt($ch,CURLOPT_POSTFIELDS, json_encode($fields));
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $result = curl_exec($ch);

        //echo curl_error($ch);
        curl_close($ch);

        

        if ($result != false){
            $result = JSON_decode($result);

            if ($result->result != null){
                $result = $result->data;
            }
            else{
                $result = false;
            }
        }

        return $result;
    }

	public function send($action, $params){
        $fields = $this->prepareRequest($action, $params);
        
        $url = $this->node."rpc/".$action;

        return $this->curl($url, $fields);
    }

    public function comment($commentid){
        $action = 'getcomments';
        $params = array('', '', '', array($commentid));

        return $this->send($action, $params);
    }
    
    public function share($txid){
        $action = 'getrawtransactionwithmessagebyid';
        $params = array(array($txid));

        return $this->send($action, $params);
    }

    public function authorbyname($name){
        $action = 'getuseraddress';

        $params = array($name);

        return $this->send($action, $params);
    }

    public function author($author){
        $action = 'getuserprofile';
        $params = array(array($author));

        return $this->send($action, $params);
    }
	
}