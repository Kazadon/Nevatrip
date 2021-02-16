var ba_route = ["18:30","18:45","19:00","19:15","19:35","21:50","21:55"]//расписание в обратную сторону

//Проверка выбранного маршрута
function checkRoute(select)
{
    //дисплеим див времени отправки и времени возвращения
    if(select.value == "из A в B и обратно в А"){
        document.getElementById("div_backtime").style.display = "block";
        document.getElementById("ba").style.display = "none";
        document.getElementById("ab").style.display = "block";

    }
    //дисплей дива отправки А в В
    else if (select.value == "из A в B") {
    	document.getElementById("ab").style.display = "block";
    	document.getElementById("ba").style.display = "none";
    	document.getElementById("div_backtime").style.display = "none";
    }
    //дисплей дива отправки В в А
    else if (select.value == "из B в A") {
    	document.getElementById("ab").style.display = "none";
    	document.getElementById("ba").style.display = "block";
    	document.getElementById("div_backtime").style.display = "none";
    }
    else{
        document.getElementById("div_backtime").style.display = "none";
        document.getElementById("ba").style.display = "none";
        document.getElementById("ab").style.display = "none";
        document.getElementById("div_count").style.display = "none";
    }
}

//При выборе времени отправки, дисплеим див с кол-вом билетов. 
//Также, если выбран АБА маршрут, при изменении времени изменяется время отправки в обратную сторону
//с учетом времени прибытия в точку В
function checkTime(select){
	var time = select.value
	//дисплей дива
	if(select.value == ""){
		document.getElementById("div_count").style.display = "none";
	}
	else {
		document.getElementById("div_count").style.display = "block";

	}
	//очистка backtime селекта
	var select = document.getElementById("backtime")
	while(select.firstChild){
				select.firstChild.remove()
			}
    
    //заталкивание в backtime времени с учетом прибытия в точку В
	for(var i = 0; i < ba_route.length; i++) {
		var time_ms = new Date('1970-01-01T' + time ).getTime() + 50*60000
		var backtime_ms = new Date('1970-01-01T' + ba_route[i] ).getTime()
		if (time_ms<= backtime_ms) {
			var option = document.createElement("option")
			option.text = new Date(backtime_ms).toLocaleString().slice(12,17)
			option.value = new Date(backtime_ms).toLocaleString().slice(12,17)
			document.getElementById("backtime").appendChild(option);
		}

	}
}

//сложение времени и перевод в читаемый формат
function addTime(time, minutes){
	var time_ms = new Date('1970-01-01T' + time ).getTime() + minutes*60000
    var finalTime = new Date(time_ms).toLocaleString().slice(12,17)
    return finalTime
}

//рассчет маршрутов и вывод сообщения пользователю
function calculate(){
	var route = document.getElementById("route").value;
	var time_ab = document.getElementById("time_ab").value;
	var time_ba = document.getElementById("time_ba").value;
	var backtime = document.getElementById("backtime").value;
	var count = document.getElementById("count").value;
	var duration = 50 //длительность поездки

	if(route == "из A в B" || route == "из B в A"){
		var price = 700;
	}
	else if(route == "из A в B и обратно в А"){
		var price = 1200
	}

	//сообщения пользователю при рассчете
	var cost = count * price;
	if (document.getElementById("route").value == "из A в B и обратно в А") {
		document.getElementById("answer").innerHTML = "Вы выбрали билетов - "+count+". Ваш маршрут: <u>"+route+"</u> стоимостью "+cost
		+"р.<br>Это путешествие займет у вас "+duration+" минут в одну сторону. "+
		"Теплоход отправляется в "+time_ab+", прибывает в точку B в "+addTime(time_ab, duration)+", а отправляется обратно в "+backtime+".";
	}
	else if (document.getElementById("route").value == "из A в B") {
		document.getElementById("answer").innerHTML = "Вы выбрали билетов - "+count+". Ваш маршрут: <u>"+route+"</u> стоимостью "+cost
		+"р.<br>Это путешествие займет у вас "+duration+" минут. "+
		"Теплоход отправляется в "+time_ab+", а прибывает в "+addTime(time_ab,duration)+".";
	}
	else {
		document.getElementById("answer").innerHTML = "Вы выбрали билетов - "+count+". Ваш маршрут: <u>"+route+"</u> стоимостью "+cost
		+"р.<br>Это путешествие займет у вас "+duration+" минут. "+
		"Теплоход отправляется в "+time_ba+", а прибывает в "+addTime(time_ba,duration)+".";
	}
	


}
