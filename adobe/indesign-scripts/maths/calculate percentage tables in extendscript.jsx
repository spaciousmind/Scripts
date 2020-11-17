$.writeln("------------------");

function sum(num1, num2, num3, num4, num5){
	mySum = (num1 + num2 + num3 + num4 + num5);
	$.writeln("sum = " + mySum);
	$.writeln("percentage = " + percentage(num1, mySum) + ", " + percentage(num2, mySum)+ ", " +percentage(num3, mySum)+ ", " +percentage(num4, mySum)+ ", " +percentage(num5, mySum));
	}

function percentage(num, per){
	//return (num/100)*per;
	return Math.round((num/per)*100);
	}


sum(1,2,3,4,10);
sum(2,0,10,30,4);
sum(1,1,1,1,2);
