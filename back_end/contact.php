<?php require('./config.php');?>

<?php
error_reporting(E_ALL);
ini_set('display_error',1);
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Access-Control-Allow-Methods:*');
header('Access-Control-Allow-Origin:*');

$object = new crud;
$conn = $object->connect();

$method = $_SERVER['REQUEST_METHOD'];
// 
switch($method){

    case "GET":

        $sql = "SELECT * FROM contact";
        $stmt =$conn->prepare($sql);
        $stmt->execute();
        $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode( $messages);

        break;




    case "POST":

        $message = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO contact ( id , name , email ,	subject , 	message ) VALUES ( null , :name, :email , :subject , :message)";
        $stmt =$conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':name', $message->name);
        $stmt->bindParam(':email', $message->email);
        $stmt->bindParam(':subject', $message->subject);
        $stmt->bindParam(':message', $message->message);

        if($stmt->execute()){
            $response = ['status'=>1,'message'=>'Record created successfully.'];
        }else{
            $response = ['status'=>0,'message'=>'Failed to created  record.'];

        }

        echo json_encode( $response);
        break;
    }
    
?>

