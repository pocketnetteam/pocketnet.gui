<?PHP
// Renders og tags the same way tpls/index.php.tpl does. Used by tests only.
// Run from the repository root: php tests/og/render.php '{"uri":"/index?s=...","ua":"...","proxypath":"http://127.0.0.1:1234/"}'

$input = json_decode($argv[1], true);

$_SERVER['REQUEST_URI'] = $input['uri'];

if (isset($input['ua'])) $_SERVER['HTTP_USER_AGENT'] = $input['ua'];

$_GET = array();
$query = parse_url($input['uri'], PHP_URL_QUERY);

if ($query) parse_str($query, $_GET);

require_once('php/og.php');

$og = new OG($_GET, $input['proxypath'], 'bastyon.com', 'Bastyon', $_SERVER['REQUEST_URI'], json_encode(array('developapps' => array())));

$og->get();
$og->echotags();
