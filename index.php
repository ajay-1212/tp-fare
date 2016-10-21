<?php
require_once ('venkyjntuk.php');
require_once ('venkydb.php');
$regd = $_GET['api'];

$reg = getreg($regd);
if($reg=='fail') {
    echo $reg; 
    return false;
}

$name_url_sql_q = "SELECT * FROM `venkymain` WHERE `reg`='$reg' and `type` = 'j' and sem != '11' and sem!='12' LIMIT 1;";
$name_url_sql=mysql_query($name_url_sql_q)or die (mysql_error());
$name_url_c=mysql_fetch_array($name_url_sql);

$name_url=$name_url_c['url'];
$name_ref=$name_url_c['ref'];

$name = getname($regd,$name_url,$name_ref);
if($name=='fail') {
    echo $name; 
    return false;
}

$sql_order = mysql_query("SELECT * FROM `venkymain` WHERE `reg` = '$reg';") or die (mysql_error());

while($sql_marks=mysql_fetch_array($sql_order)) {
    $url=$sql_marks['url'];
    $sem=$sql_marks['sem'];
    $ref=$sql_marks['ref'];
    $type=$sql_marks['type'];
    
    $res = getmarks($regd,$url,$ref,$sem,$type);
    $back[]= $res;
    }

//$marks = getmarks('10331a0398','10331A03','','','j');
//echo $reg.'<br>'.$name.'<br>'.$marks;
echo $reg.'<br>'.$name.'<br>'.array_sum($back);
?>