<?php

$token = "8757239334:AAFRkYJ62w2n3WhcWharR_O06h4GYgpPMcU";
$chat  = "-1003762912239";

$text =
"🎉 <b>New Conversion</b>\n".
"💰 $".$_POST['payout']."\n".
"📦 Offer: ".$_POST['offer_id']."\n".
"🆔 ".$_POST['tracking_id'];

file_get_contents(
"https://api.telegram.org/bot{$token}/sendMessage?".
http_build_query([
    "chat_id"=>$chat,
    "text"=>$text,
    "parse_mode"=>"HTML"
]));

echo "OK";
?>
