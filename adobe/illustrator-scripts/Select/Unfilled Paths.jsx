﻿// Выделение всех незалитых контуров.

#target "illustrator"
#include "ProgressBar.incjsx"
#include "Select.incjsx"
        
Select('pathItems', function(pi){
    return !pi.filled;
});
