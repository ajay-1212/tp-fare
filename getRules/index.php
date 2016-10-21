<?php
$header = array();
$data='{
  "Key": "LAXSIN001",
    "Origin": "LAX",
    "Destination": "SIN",
    "DepartureDate": "2016-10-31",
    "ReturnDate": "",
    "PassengerType": "ADT"
  }
}';
$header[] = 'Access-Control-Allow-Headers : *';
$header[] = 'Content-type: application/json';
$header[] = 'Authorization: Bearer jHBGzFs1LRennqdGsdFj_pgxw3ka';
$url_link='http://apphonics.tcs.com/public/travelport/fareRulesFinder/v1.0.0/getFareRules';
$ch = curl_init();
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_URL, $url_link);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION,false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1');
$html = curl_exec($ch);
curl_close($ch);

header('Content-type: application/json');
echo json_encode(json_decode($html, true));

?>
