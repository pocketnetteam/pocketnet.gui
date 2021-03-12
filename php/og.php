<?PHP
require_once('php/rpc.php');

class OG {

    private $rpc = NULL;
    private $author = NULL;
    private $txid = NULL;
    private $commentid = NULL;
    private $parentid = NULL;
    private $imageNum = 0;

    private $maphrefs = array('about', 'applications', 'terms', 'page404', 'registration', 'anothersite', 'token', 'filluser', 'usersettings', 'test', 'accounts', 'messenger', 'articles', 'article', 'video', 'help', 'donations', 'faq', 'embeding20', 'embeding', 'userpage', 'chat', 'mchat', 'wallet', 'share', 'comments', 'lenta', 's', 'imagesEdit', 'imagegallery', 'aboutus', 'menu', 'toppanel', 'navigation', 'footer', 'support', 'notifications', 'panel', 'discussions', 'authorization', 'addaccount', 'complain', 'scheduler', 'surveyiframe', 'socialshare', 'index', 'post', 'userslist', 'ustate');

    public $defaultOg = array(
        'title' => 'Pocketnet: First Fully Decentralized Social Network on Blockchain', 
        'site_name' => 'Pocketnet', 
        'type' => 'website',
        'image' => 'https://pocketnet.app/img/logosmallpadding.png',
        'description' => 'A Revolutionary anti-censorship decentralized publishing and social platform. Based on the blockchain technology, it runs on a set of computers around the world, not controlled by any single entity. Self-policed by users with good reputation where nobody records your keystrokes, viewing habits or searches.',
       


    );

    public $currentOg = array();

    

	public function __construct ($get)
	{
        $this->rpc = new RPC();
        
        if (isset($get['address'])) $this->author = $get['address'];

        if ($this->author == NULL) {

            $a = $this->addressfromhref();

            if($a != false){
                $this->author = $a;
            }

        }

        if (isset($get['commentid'])) $this->commentid = $get['commentid'];

        if (isset($get['s'])) $this->txid = $get['s'];

        if ($this->author == NULL && isset($get['i'])) $this->txid = $get['i'];

        if ($this->author == NULL && isset($get['v'])) $this->txid = $get['v'];

        if (isset($get['num'])) $this->imageNum = $get['num'];

	}
	public function __destruct ()
	{

    }

    public function addressfromhref(){
        $h = $this->href();

        $k = array_search($h, $this->maphrefs);

        if($k == false){

            $a = $this->rpc->authorbyname($h);

            if ($a != false){

                $a = $a[0]->address;

                return $a;

            }

            return false;

        }

        return false;
    }

    public function href(){

        $uri = $_SERVER['REQUEST_URI'];

        $c1 = explode('/', $uri);

        $last = $c1[count($c1) - 1];

        $c2 = explode('?', $last);

        return strtolower($c2[0]);
    }
    public function ogFromVideo($url){

        $v = $this->parseVideo($url);

		if ($v['type'] == 'youtube' || $v['type'] == 'vimeo' || $v['type'] == 'peertube'){

			$this->currentOg['type'] = 'video.other';
            $this->currentOg['video:type'] = 'text/html';

            if ($v['type'] == 'youtube'){
                $this->currentOg['video:url'] = 'https://www.youtube.com/embed/'.$v['id'];
                $this->currentOg['video:secure_url'] = 'https://www.youtube.com/embed/'.$v['id'];
            }
            
		}

        return false;
    }
    public function parseVideo($url){

        $_url = $url;
        $test = NULL;

        $t = preg_match('/(peertube:\/\/)?(http:\/\/|https:\/\/|)?(player.|www.)?(pocketnetpeertube[0-9]*\.nohost\.me|peer\.tube|vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|bitchute\.com)\/((videos?\/|embed\/|watch\/?)*(\?v=|v\/)?)*([A-Za-z0-9._%-]*)(\&\S+)?/', $_url, $test);
        $type = NULL;
        $id = NULL;

        if($test && trpos($_url, 'channel') == false && trpos($_url, 'user') == false){
            if($test[3]){

                if (strpos($test[3], 'youtu') !== false) {
                    $type = 'youtube';
                    $id = $test[6];

                } 
                
                if (strpos($test[3], 'vimeo')  !== false) {
                    $type = 'vimeo';
                    $id = $test[2];
                }

                if (strpos($test[3], 'bitchute.com')  !== false) {
					$type = 'bitchute';
					$id = $test[9];	
			    }

                if (strpos($test[3], 'peertube://')  !== false) {
					$type = 'peertube';
			        $id = $test[9];
					$host_name = $test[4];
			    }

            }
        }

        $r = array(
            'type' => $type,
            'url' => $url,
            'id' => $id,
            'host_name' => $host_name
        );

        return $r;

    }

    public function videoImage ($url){

        $v = $this->parseVideo($url);

		if ($v['type'] == 'youtube'){
			return 'http://img.youtube.com/vi/'. $v['id'].'/mqdefault.jpg';
		}

		if ($v['type'] == 'vimeo'){
			return 'http://i.vimeocdn.com/video/'.$v['id'].'_320.jpg';
        }
        
        return false;
	}
    
    public function get(){

        $image = false;
        $title = false;
        $description = false;
        $pca = 'a';

        if($this->txid != NULL){

            $r = $this->rpc->share($this->txid);

            if($r != false){

                $r = $r[0];

                $pca = 'p';

                $this->author = $r->address;

                if ($r->c != ''){
                    $this->currentOg['title']= urldecode($r->c);
                    $title = true;
                }
                    
                    
                $this->currentOg['description'] = substr(strip_tags(urldecode($r->m)), 0, 130).'...';
                $description = true;

                $this->currentOg['type'] = 'article';

                if (isset($r->u) && $r->u != ''){
                    $this->ogFromVideo($url);
                }

                if (isset($r->i[$this->imageNum])) {
                    $this->currentOg['image'] = $r->i[$this->imageNum];
                    $image = true;
                }
                else{

                    if(isset($r->u) && $r->u != ''){

                        $video = $this->videoImage(urldecode($r->u));
                        
                        if($video){
                            $this->currentOg['image'] = $video;

                            $image = true;
                        }
                    }

                }

            }

            
        }

        if($this->commentid != NULL){

            $comment = $this->rpc->comment($this->commentid);

            if ($comment != false){

                if(isset($comment[0])){

                    $comment = $comment[0];

                    

                    $this->author = $comment->address;
                    
                    try{

                        $msg = json_decode($comment->msg);

                        $pca = 'c';

                        $this->currentOg['description'] = substr(strip_tags(urldecode($msg->message)), 0, 130).'...';                         
                        
                    } 
                    
                    catch (Exception $ex) {
                       
                    }

                   
                }

               

            }
        }

        
        if($this->author != NULL){

            $a = $this->rpc->author($this->author);

            if ($a != false){
                $a = $a[0];

                if(!$title){
                    $this->currentOg['title'] = urldecode($a->name);

                    if($pca == 'c') $this->currentOg['title'] = "Comment by " . $this->currentOg['title'];
                    if($pca == 'p') $this->currentOg['title'] = "Post by " . $this->currentOg['title'];
                }

                if(!$description){
                    $this->currentOg['description'] = urldecode($a->name).". Shares: " . $a->postcnt . " Followers: " . count($a->subscribers);
                }

                if(isset($a->a) && $a->a != ''){
                    $this->currentOg['description'] .= "\n". substr(strip_tags(urldecode($a->a)), 0, 130).'...';
                }

                if(!$image){
                    $this->currentOg['image'] = $a->i;
                }

            }
        }

        
    
	}   

	public function echotags(){

        foreach ($this->defaultOg as $key => $value) {
           
            $v = $value;

            if(isset($this->currentOg[$key])) $v = $this->currentOg[$key];

            echo '<meta property="og:'.$key.'" content="'.$v.'">';
            
        }

    }
}