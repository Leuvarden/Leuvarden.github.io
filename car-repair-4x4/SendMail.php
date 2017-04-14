<?php
/* Осуществляем проверку вводимых данных и их защиту от враждебных 
скриптов */
$car = htmlspecialchars($_POST["car"]);
$yProd = htmlspecialchars($_POST["yProd"]);
$phone = htmlspecialchars($_POST["phone"]);
$name = htmlspecialchars($_POST["name"]);
$question = htmlspecialchars($_POST["question"]);
$tema = "Обратная связь с s4x4.by";
/*
echo "Обратная связь с s4x4.by";
echo "|";
echo $_POST["car"];
echo "|";
echo $yProd;
echo "|";
echo $question;
echo "|

";
*/
$mess = "=== Сообщение: ===
Автомобиль: $car
Год выпуска: $yProd
Телефон: $phone 
Имя: $name 
Вопрос: $question
=== End ===";
/*
echo "|";
echo $mess;
echo "|";
*/
$toMail = "v123121@gmail.com, 	t.e.a.proservice@mail.ru";
$fromMail = "vv123121@yandex.ru";
mail($toMail, $tema, $mess, $fromMail);
echo "
<html>
  <head>
   <meta http-equiv='Refresh' content='0; URL=".$_SERVER['HTTP_REFERER']."'>
  </head>
</html>";

//header("Location: http://www.s4x4.by/index.html/#");
exit();
?>
