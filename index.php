<?php

date_default_timezone_set("Asia/Shanghai");
//echo phpinfo();exit;


print_r(dbconect());exit;
function dbconect(){
	$db = new PDO('mysql:host=localhost;dbname=shop', 'wx_uqitu', 'Wnn50WAU');
	//return $db;
	$sql = "insert into  timeadmin (openid) VALUES ('sdf111111sf')";
	$db->query($sql);
	foreach($db->query('SELECT * from timeadmin') as $row) {
        print_r($row);
    }

}

function getRows($sql){
	$db = dbconect();
	foreach($db->query($sql) as $row) {
        $s[] = $row;
    }

    return $s;
}

//print_r($_POST);




//新增或修改时间内容
if($_GET['post']==1){


	//===============================计算出新提交的时间有几个30分钟===============================//
	$starttime = strtotime("2018-05-12 {$_POST['timestart']}");
	$endttime = strtotime("2018-05-12 {$_POST['timeend']}");
	$val = ($endttime-$starttime)%86400/60;

	$s = $starttime;

	for($i=0; $i<$val/30; $i++){
		$timepoint = date("H:i",$s);
		$newTimes[] = $timepoint;
		$s = $s+1800;
		
		$sarray[$timepoint]['times'] = $_POST['timestart']."~".$_POST['timeend'];
		$sarray[$timepoint]['titel'] = urlencode($_POST['textarea']);
		$sarray[$timepoint]['selecttodo'] = $_POST['selecttodo'];
		
	}
	//======================END================//




	//===============================计算原有的时间有几个30分钟===============================//

	$tempTimes = explode('~', $_POST['times']);

	$starttime = strtotime("2018-05-12 {$tempTimes[0]}");
	$endttime = strtotime("2018-05-12 {$tempTimes[1]}");
	$val = ($endttime-$starttime)%86400/60;

	$s = $starttime;

	for($i=0; $i<$val/30; $i++){
		$timepoint = date("H:i",$s);
		$oldTimes[] = $timepoint;
		$s = $s+1800;
		
		
	}
	//======================END================//




	//=======计算新提交的时间与原有的时间的差集，对比出来后把差集从数据表中删除=====//

	//print_r($newTimes);
	//print_r($oldTimes);
	$deleteTimes=array_diff($oldTimes,$newTimes);
	//print_r($deleteTimes);exit;

	//================================================END==================================================///

	






	//获取此用的数据表中的时间计划内容
	$sql = "SELECT * from timeadmin where openid='{$_POST['openid']}'";
	$result = getRows($sql);



	//如果今天已有数据，那么就做时间内容的更新，否则就新写入一条数据
	if($result!=""){

		$s = json_decode($result[0]['workcontent'],true);
		

		//把计算出来的差集，从时间表中删除
		if($deleteTimes!=""){
			foreach ($deleteTimes as $key => $value) {
				unset($s[$value]);
				//print_r($s[$value]);
			}
		}
		//print_r($s);exit;


		

		//新提交的时间内容，把原先表中的记录进行替换或增加
		foreach ($sarray  as $key => $value) {
			//print_r($key.$value);
			$s[$key] = $value;
		}




		//更新记录
		$content = json_encode($s);
		$sql = "update timeadmin set workcontent='$content',workdate='sss' where openid='{$_POST['openid']}'";
		$db = dbconect();
		$db->query($sql);
		//print_r($s);


	}else{
		$content = json_encode($sarray);
		$sql = "insert into  timeadmin (openid,workdate,workcontent) VALUES ('{$_POST['openid']}','','$content')";
		$db = dbconect();
		$db->query($sql);
	}

	echo json_encode($_POST);exit;
}





if($_GET['post']==2){

	for($i=0;$i<24; $i++){

		($i<10)?$string .= "0".$i.",":$string.=$i.",";
	}
	$result['hour'] = trim($string,",");
	$result['minute'] = "00,30";
	echo json_encode($result);exit;
}





/*$starttime = strtotime("2018-05-11 06:00");
$endttime = strtotime("2018-05-11 07:40");
$val = ($endttime-$starttime)%86400/60;

$s = $starttime;

for($i=0; $i<$val/30; $i++){
	$timepoint = date("H:i",$s);
	$s = $s+1800;

	$sarray[$timepoint]['timepoint'] = $timepoint;
	$sarray[$timepoint]['titel'] = "(中国标准时间) 配置中关闭 请求域名、业务域名、web-view 域名、TLS 版本以及 HTTPS 证书检查";
	$sarray[$timepoint]['color'] = "#FFFF00";
	
}

//print_r($sarray);

$sarray["08:00"]['titel'] = "中国标准时间(中国标准时间) 配置中关闭 请求域名、业务域名、web-view 域名、TLS 版本以及 HTTPS 证书检查(中国标准时间) 配置中关闭 请求域名、业务域名、web-view 域名、TLS 版本以及 HTTPS 证书检查(中国标准时间) 配置中关闭 请求域名、业务域名、web-view 域名、TLS 版本以及 HTTPS 证书检查";
$sarray["08:00"]['color'] = "#F4A460";
$sarray["08:00"]['times'] = "08:00~09:00";

$sarray["08:30"]['titel'] = "中国标准时间";
$sarray["08:30"]['color'] = "#F4A460";
$sarray["08:30"]['times'] = "08:00~09:00";

$sarray["09:00"]['titel'] = "中国标准时间";
$sarray["09:00"]['color'] = "#F4A460";
$sarray["09:00"]['times'] = "08:00~09:00";

$sarray["09:30"]['titel'] = "(中国标准时间) 配置中关闭 请求域名、业务域名、web-view 域名、TLS 版本以及 HTTPS 证书检查(中国标准时间) 配置中关闭 请求域名、业务域名、web-view 域名、TLS 版本以及 HTTPS 证书检查(中国标准时间) 配置中关闭 请求域名、业务域名、web-view 域名、TLS 版本以及 HTTPS 证书检查";
$sarray["09:30"]['color'] = "#8FBC8F";



$sarray["10:00"]['titel'] = "(中国标准时间) 配置中关闭 请求域名、业务域名、web-view 域名、TLS 版本以及 HTTPS 证书检查";
$sarray["10:00"]['color'] = "#EE2C2C";

$sarray["10:30"]['titel'] = "(中国标准时间) 配置中关闭 请求域名、业务域名、web-view 域名、TLS 版本以及 HTTPS 证书检查";
$sarray["10:30"]['color'] = "#1E90FF";
*/
//print_r($sarray);

$sql = "SELECT * from timeadmin where openid='o34aV5Pvq_jMVAKjNHH66ME_TNGc'";
$res = getRows($sql);

if($res!=""){

	$tempArray = json_decode($res[0]['workcontent'],true);
	//print_r($tempArray);
	foreach ($tempArray  as $key => $value) {
		//print_r($key.$value);
		//print_r($value);
		$sarray[$key]['titel'] = urldecode($value['titel']);
		$sarray[$key]['times'] = $value['times'];

		if($value['selecttodo']==0)$sarray[$key]['color'] = "#8FBC8F";
		if($value['selecttodo']==1)$sarray[$key]['color'] = "#EE2C2C";
		if($value['selecttodo']==2)$sarray[$key]['color'] = "#F4A460";
		if($value['selecttodo']==3)$sarray[$key]['color'] = "#1E90FF";
		if($value['selecttodo']==4)$sarray[$key]['color'] = "#FFFF00";
	}
	//print_r($sarray);

}

  $n=0;
  for($i=6; $i<24; $i++){

  	($i<10)?$x = "0".$i:$x=$i;
  	//echo $x."<br>";

    $array[$n++] = $x . ":00";
    $array[$n++] = $x . ":30";
  }

 
  for($i=0; $i<count($array); $i++){

  	//echo ($sarray[$array[$i]][titel]);


  	$temparray[$i][id] = $i;
	$temparray[$i][linehide] = 2;
  	$temparray[$i][timepoint] = $array[$i];
  	$temparray[$i][title] = $sarray[$array[$i]][titel];
  	$temparray[$i][desc] = $sarray[$array[$i]][titel];
  	$temparray[$i][color] = $sarray[$array[$i]][color];
  	$temparray[$i][times] = $sarray[$array[$i]][times];
  	$temparray[$i][height] = "130rpx";

  	

	
  	
  	if($sarray[$array[$i]][times]!=""){
		//print_r($sarray[$array[$i]][times]);exit;

		$tempTimes = explode('~', $sarray[$array[$i]][times]);
  		
  		//if($array[$i]>="08:30"&&$array[$i]<="09:00"){
		if($array[$i]>$tempTimes[0]&&$array[$i]<=$tempTimes[1]){
  			/*echo "ssss";
  			echo $array[$i];
  			echo $sarray[$array[$i]][times];*/
  			$temparray[$i][linehide] = 0;
  			$temparray[$i][title] = "";
  			$temparray[$i][height] = "50rpx";
  		}
  		
  	}

  	
  	
  }

 //print_r($temparray);exit;



echo json_encode($temparray);
exit;


?>