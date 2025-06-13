<?php
include './../../db_connect.php';

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $stmt = $conn->prepare("SELECT * FROM workhours WHERE submission_id =?");
            $stmt->bind_param("i", $id);
            $data = [];
            if (!$stmt->execute()) {
                $message = "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
                echo json_encode(["message" => $message]);
            } else {
                $result = $stmt->get_result();
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                echo json_encode($data);
            } 
        } else if (isset($_GET['email'])) {
            $email = $_GET['email'];
            $stmt = $conn->prepare("SELECT users.user_id, users.user_flags, users.email, users.fname, users.lname, 
                workhours.time_in, workhours.time_out, workhours.under_review, workhours.accepted,
                DATE(workhours.time_out) AS date_worked, workhours.submission_id,
                TIMESTAMPDIFF(MINUTE, workhours.time_in, workhours.time_out) / 60 AS hours
                FROM users 
                LEFT JOIN workhours
                ON users.user_id = workhours.user_id
                Where users.email=?");
            $stmt->bind_param("s", $email);
            $data = [];
            if (!$stmt->execute()) {
                $message = "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
                echo json_encode(["message" => $message]);
            } else {
                $result = $stmt->get_result();
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                echo json_encode($data);
            } 
        } else if (isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];
            $stmt = $conn->prepare("SELECT accepted, submission_id,
                DATE(workhours.date) AS date_worked,
                TIMESTAMPDIFF(MINUTE, time_in, time_out) / 60 AS hours
                FROM workhours
                WHERE user_id=?");
            $stmt->bind_param("i", $user_id);
            $data = [];
            if (!$stmt->execute()) {
                $message = "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
                echo json_encode(["message" => $message]);
            } else {
                $result = $stmt->get_result();
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                echo json_encode($data);
            } 
        } else {
            $result = $conn->query("SELECT * FROM workhours");
            $users = [];
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            echo json_encode($users);
        }
        break;

    case 'POST':
        $time_in = $input['time_in'];
        $time_out = $input['time_out'];
        $date = $input['date'];
        $user_id = intval($input['user_id']);
        $under_review = intval($input['under_review']);
        $accepted = intval($input['accepted']);
        $stmt = $conn->prepare("INSERT INTO workhours (time_in, time_out, date, user_id, under_review, accepted) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssiii", $time_in, $time_out, $date, $user_id, $under_review, $accepted);
        $message = "$time_in, $time_out, $date, $user_id, $under_review, $accepted";
        if (!$stmt->execute()) {
           $message = "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
        } else {
           $message = "Workhours added successfully";
        }
        echo json_encode(["message" => $message]);
        break;

    case 'PUT':
        if($_GET['accepted'] AND $_GET['accepted'] == true){
            $id = $_GET['id'];
            // $under_review = intval($input['under_review']);
            // $accepted = intval($input['accepted']);

            $stmt = $conn->prepare("UPDATE workhours
                SET under_review = 0, accepted = 1
                WHERE submission_id = ?");
            $stmt->bind_param("i", $id);
            $message = "$id";
            if (!$stmt->execute()) {
                $message = "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
            } else {
                $message .= ": Workhours updated successfully";
            }
            echo json_encode(["message" => $message]);
        }
        else if($_GET['accepted'] AND $_GET['accepted'] == false){
            $id = $_GET['id'];
            // $under_review = intval($input['under_review']);
            // $accepted = intval($input['accepted']);

            $stmt = $conn->prepare("UPDATE workhours
                SET under_review = 0, accepted = 0
                WHERE submission_id = ?");
            $stmt->bind_param("i", $id);
            $message = "$id";
            if (!$stmt->execute()) {
                $message = "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
            } else {
                $message .= ": Workhours updated successfully";
            }
            echo json_encode(["message" => $message]);
        }
        else {
            $id = $_GET['id'];
            $time_in = $input['time_in'];
            $time_out = $input['time_out'];
            $date = $input['date'];
            $under_review = intval($input['under_review']);
            $accepted = intval($input['accepted']);

            $stmt = $conn->prepare("UPDATE workhours
                SET time_in = ?, time_out = ?, date = ?, under_review = ?, accepted = ?
                WHERE submission_id = ?");
            $stmt->bind_param("sssiii", $time_in, $time_out, $date, $under_review, $accepted, $id);
            $message = "$time_in, $time_out, $date, $id, $under_review, $accepted";
            if (!$stmt->execute()) {
            $message .= "\nExecute failed: (" . $stmt->errno . ") " . $stmt->error;
            } else {
            $message .= "\nWorkhours updated successfully";
            }
            echo json_encode(["message" => $message]);
        }
        break;

    // case 'DELETE':
    //     $id = $_GET['id'];
    //     $conn->query("DELETE FROM workhours WHERE id=$id");
    //     echo json_encode(["message" => "Workhours deleted successfully"]);
    //     break;

    default:
        echo json_encode(["message" => "Invalid request method"]);
        break;
}

$conn->close();
?>