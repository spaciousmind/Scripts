$.writeln("------------------");

function sum(num1, num2, num3, num4, num5){
mySum = (num1 + num2 + num3 + num4 + num5);
//	$.writeln("sum = " + mySum);
$.writeln(percentage(num1, mySum) + ", " + percentage(num2, mySum)+ ", " +percentage(num3, mySum)+ ", " +percentage(num4, mySum)+ ", " +percentage(num5, mySum));
}

function percentage(num, per){
return Math.round((num/per)*100);
}


sum(52, 18, 0, 0, 0);
sum(0, 2, 2, 34, 32);
sum(1, 1, 6, 34, 28);
sum(0, 3, 11, 34, 22);
sum(0, 0, 5, 22, 43);
sum(0, 1, 1, 40, 28);
sum(1, 2, 4, 42, 21);
sum(0, 2, 6, 37, 25);
sum(47, 49, 45, 9, 0);
sum(12, 10, 15, 19, 13);
sum(4, 4, 15, 35, 10);
sum(3, 3, 9, 39, 7);
sum(1, 2, 8, 36, 14);
sum(3, 4, 17, 31, 4);
sum(1, 3, 9, 41, 16);
sum(0, 2, 9, 39, 20);
sum(14, 4, 6, 46, 0);
sum(0, 2, 10, 31, 27);
sum(0, 4, 10, 37, 18);
sum(0, 4, 11, 44, 10);
sum(0, 1, 2, 35, 32);
sum(0, 1, 5, 36, 27);
sum(0, 2, 1, 38, 29);
sum(0, 2, 13, 37, 15);
$.writeln("NEWLINE---------------------")
sum(12, 10, 15, 19, 13);
