<?PHP
require_once('php/rpc.php');
require_once('php/api.php');


class OG {

    private $rpc = NULL;
    private $author = NULL;
    private $connect = FALSE;
    private $txid = NULL;
    private $commentid = NULL;
    private $parentid = NULL;
    private $imageNum = 0;

    private $domain = NULL;
    private $project = NULL;
    

    private $maphrefs = array("pkview","about","applications","terms","page404","welcome","registration","anothersite","token","filluserfast","filluser","usersettings","test","accounts","uploadpeertube","streampeertube","tagcloud","taginput","categories","staking","lastcomments","articles","article","video","system16","connection","proxylogs","help","donations","faq","embeding","userpage","oldchat","wallet","share","comments","tube","lenta","transactionview","s","send","imageGalleryEdit","imagegallery","aboutus","menu","toppanel","navigation","footer","support","notifications","panel","leftpanel","discussions","authorization","addaccount","complain","postscores","scheduler","surveyiframe","socialshare","socialshare2","main","author","channel","post","userslist","ustate","dust","testApi", "index");

    private $defaultOg = NULL;

    public $currentOg = array();



	public function __construct ($get, $proxypath, $domain, $project)
	{
        $this->rpc = new RPC($proxypath);
        $this->api = new API($proxypath);

        $this->project = $project;
        $this->domain = $domain;

        $this->defaultOg = array(
            'title' => $this->project.': First Fully Decentralized Social Network on Blockchain', 
            'site_name' => $this->project, 
            'type' => 'website',
            'image' => 'img/logosmallpadding.png',
            'description' => 'A Revolutionary anti-censorship decentralized publishing and social platform. Based on the blockchain technology, it runs on a set of computers around the world, not controlled by any single entity. Self-policed by users with good reputation where nobody records your keystrokes, viewing habits or searches.',
        );
        
        if (isset($get['address'])) $this->author = $this->clean($get['address']);
        if (isset($get['connect'])) {
            $this->author = $this->clean($get['connect']);
            $this->connect = TRUE;
        }

        if ($this->author == NULL) {

            $a = $this->addressfromhref();

            if($a != false){
                $this->author = $a;
            }

        }

        if (isset($get['commentid'])) $this->commentid = $this->clean($get['commentid']);

        if (isset($get['s'])) $this->txid = $this->clean($get['s']);
        if (isset($get['v'])) $this->txid = $this->clean($get['v']);

        if ($this->author == NULL && isset($get['i'])) $this->txid = $this->clean($get['i']);

        if ($this->author == NULL && isset($get['v'])) $this->txid = $this->clean($get['v']);

        if (isset($get['num'])) $this->imageNum = $this->clean($get['num']);

	}
	public function __destruct ()
	{

    }

    public function is_bot() {

        if (isset($_SERVER['HTTP_USER_AGENT'])){
            if(preg_match('/mozila|gekko|safari|chrome|khtml|webkit/i', $_SERVER['HTTP_USER_AGENT'])){
                if(preg_match('/vkshare|whatsapp|viber|instagram/i', $_SERVER['HTTP_USER_AGENT'])){
                    return true;
                }

                return false;
            }

            return true;
        }
        
        return true;

    }

    public function clean($value) {
        $value = trim($value);
        $value = stripslashes($value);
        $value = strip_tags($value);
        $value = htmlspecialchars($value);

        
        return $value;
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

    public function ogFromVideo($url, $txid){

        $v = $this->parseVideo($url);



		if ($v['type'] == 'youtube' || $v['type'] == 'vimeo' || $v['type'] == 'peertube'){

			$this->currentOg['type'] = 'video.other';
            $this->currentOg['video:type'] = 'text/html';

            $ci = 'https://'.$v['host_name'].'/lazy-static/previews/'. $v['id'] . '.jpg';
            $cu = 'https://'.$v['host_name'].'/download/videos/'. $v['id'] . '-480.mp4';
            $u = 'https://'.$this->domain.'/openapi.html?action=lenta&id='.$txid.'&embeddingSettigns=7b22626c61636b223a312c22636f6d6d656e7473223a226e6f222c2266756c6c73637265656e766964656f223a312c22726566223a2250523773727a5a74344566634e62337332376772676d69473861423976594e563832227d';

            $this->currentOg['video:url'] = $u;
            $this->currentOg['video:secure_url'] = $u;
            
            if($v['type'] == 'peertube'){
                //$u = 'https://'.$v['host_name'].'/download/videos/'. $v['id'] . '-480.mp4';

                $peertubeinfo = $this->api->peertubeinfo($v['host_name'], $v['id']);

                $this->currentOg['twitter:site'] = $this->domain;
                $this->currentOg['twitter:card'] = 'player';

                if(isset($peertubeinfo->previewPath)){
                    $this->currentOg['twitter:image'] = 'https://' . $peertubeinfo->from . $peertubeinfo->previewPath;
                }
                
                $this->currentOg['twitter:title'] = $this->currentOg['title'];
                $this->currentOg['twitter:text:title'] = $this->currentOg['title'];
                $this->currentOg['twitter:description'] = $this->currentOg['description'];
                $this->currentOg['twitter:player:stream'] = $cu;
                $this->currentOg['twitter:player:stream:content_type'] = 'video/mp4';
                $this->currentOg['twitter:player'] = $u;
                $this->currentOg['twitter:player:width'] = '1280';
                $this->currentOg['twitter:player:height'] = '720';
            }
        
		}

        return false;
    }

    public function parseVideo($url){

        $_url = $url;
        $test = NULL;
        $host_name = '';
        $params = '';

        $t = preg_match('/(peertube:\/\/)?(http:\/\/|https:\/\/|)?(player.|www.)?(pocketnetpeertube[0-9]*\.nohost\.me|peer\.tube|vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|bitchute\.com)\/((videos?\/|embed\/|watch\/?)*(\?v=|v\/)?)*([A-Za-z0-9._%-]*)(\&\S+)?/', $_url, $test);

        $type = NULL;
        $id = NULL;

        if(strpos($url, 'peertube://') !== false){

            $cl = str_replace('peertube://', '', $url);

            $keywords = explode('/',  $cl);

            $type = 'peertube';
            $id = $keywords[1];
            
            $host_name = $keywords[0];

           
        }
        else{
            if(($test && strpos($_url, 'channel') == false && strpos($_url, 'user') == false) || strpos($url, 'peertube://') !== false){
                if($test[3]){
    
                    if (strpos($test[3], 'youtu') !== false) {
                        $type = 'youtube';
                        $id = $test[6];
    
                    } 
                    
                    if (strpos($test[3], 'vimeo')  !== false) {
                        $type = 'vimeo';
                        $id = $test[2];
                    }
    
                    if (strpos($test[3], 'bitchute.com') !== false) {
                        $type = 'bitchute';
                        $id = $test[9];	
                    }
    
                }
    
                if (strpos($url, 'peertube://') !== false) {
    
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
            'host_name' => $host_name,
            'params' => $params
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

        if ($v['type'] == 'peertube'){
			return 'https://'.$v['host_name'].'/lazy-static/previews/'. $v['id'] . '.jpg';
        }

        
        return false;
	}
    
    public function get(){

        $image = false;
        $title = false;
        $description = false;
        $pca = 'a';

            

        if($this->is_bot()){
            
            $this->currentOg['user'] = $_SERVER['HTTP_USER_AGENT'];

            if($this->author != NULL){

                $a = $this->rpc->author($this->author);

                if ($a != false){
                    $a = $a[0];

                    if(!$title){
                        $this->currentOg['title'] = urldecode($a->name);

                        if($pca == 'c') $this->currentOg['title'] = "Comment by " . $this->currentOg['title'];
                        if($pca == 'p') $this->currentOg['title'] = "Post by " . $this->currentOg['title'];

                        if($this->connect == TRUE) $this->currentOg['title'] = "Connect with " . $this->currentOg['title'];
                    }

                    if(!$description){
                        $this->currentOg['description'] = urldecode($a->name).". Shares: " . $a->postcnt . " Followers: " . count($a->subscribers);
                    }

                    if(isset($a->a) && $a->a != ''){
                        $this->currentOg['description'] .= "\n". strip_tags(urldecode($a->a));
                    }

                    if(!$image){
                        $this->currentOg['image'] = $a->i;
                    }

                }
            }

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
                        $this->ogFromVideo(urldecode($r->u), $this->txid);
                    }

                    if (isset($r->i[$this->imageNum])) {
                        $this->currentOg['image'] = $r->i[$this->imageNum];
                        $image = true;
                    }
                    else{

                        if(isset($r->u) && $r->u != ''){

                            $video = $this->videoImage(urldecode($r->u));
                            
                            if($video){

                                if(isset($this->currentOg['twitter:image'])){
                                    $this->currentOg['image'] = $this->currentOg['twitter:image'];
                                }
                                else{
                                    $this->currentOg['image'] = $video;
                                }   

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

        }
       
	}   

	public function echotags(){

        foreach ($this->defaultOg as $key => $value) {
           
            $v = $value;
            $prefix = 'og:';

            if(strpos($key, 'twitter') !== false) $prefix = '';

            if(isset($this->currentOg[$key])) $v = $this->currentOg[$key];

            echo '<meta property="'.$prefix.''.$key.'" content="'.$v.'">';
            
        }

        foreach ($this->currentOg as $key => $value) {
           
            $v = $value;

            $prefix = 'og:';

            if(strpos($key, 'twitter') !== false) $prefix = '';

            if(!isset($this->defaultOg[$key])) {
                echo '<meta property="'.$prefix.''.$key.'" content="'.$v.'">';
            }

           
            
        }

    }
}