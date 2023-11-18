<?php
if(file_exists('log')) 
{
    $fp = fopen('log', 'a');
    fwrite($fp, "\n".$_POST['data'].' '.date("H:i:s"));  
    fclose($fp);  
}
else
{
    $fp = fopen('log', 'w');
    fwrite($fp, $_POST['data'].' '.date("H:i:s"));  
    fclose($fp);
}
?> 