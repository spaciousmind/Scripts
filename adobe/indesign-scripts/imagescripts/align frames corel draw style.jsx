// DESCRIPTION Align frames CorelDraw-style: last selected frame is target
// Peter Kahrel

var obj = app.selection;
if( obj.length < 2 )
	errorM('Select at least two objects');

switch( alignType( obj ).toUpperCase() )
	{
	// horizontal alignment
	case 'RL' : align_hor( obj, 'right', 'left'); break;
	case 'RC' : align_hor( obj, 'right', 'hcentre'); break;
	case 'RR' : align_hor( obj, 'right', 'right'); break;
	case 'CL' : align_hor( obj, 'hcentre', 'left'); break;
	case 'CCH' : align_hor( obj, 'hcentre', 'hcentre'); break;
	case 'CR' : align_hor( obj, 'hcentre', 'right'); break;
	case 'LL' : align_hor( obj, 'left', 'left'); break;
	case 'LC' : align_hor( obj, 'left', 'hcentre'); break;
	case 'LR' : align_hor( obj, 'left', 'right'); break;
	// vertical alignment
	case 'BT' : align_vert( obj, 'bottom', 'top'); break;
	case 'BC' : align_vert( obj, 'bottom', 'vcentre'); break;
	case 'BB' : align_vert( obj, 'bottom', 'bottom'); break;
	case 'CT' : align_vert( obj, 'vcentre', 'top'); break;
	case 'CCV' : align_vert( obj, 'vcentre', 'vcentre'); break;
	case 'CB' : align_vert( obj, 'vcentre', 'bottom'); break;
	case 'TT' : align_vert( obj, 'top', 'top'); break;
	case 'TC' : align_vert( obj, 'top', 'vcentre'); break;
	case 'TB' : align_vert( obj, 'top', 'bottom'); break;
	default : errorM('Illegal input.')
	}

function align_hor( obj, source_align, target_align ){
var target = getPosition( obj[0], target_align )
for( var i = 1; i < obj.length; i++ )
	obj[i].move( undefined, 
		[target - getPosition(obj[i],source_align), 0], true )
}

function align_vert( obj, source_align, target_align ){
var target = getPosition( obj[0], target_align )
for( var i = 1; i < obj.length; i++ )
	obj[i].move( undefined, 
		[0, target - getPosition(obj[i],source_align)], true )
}

function getPosition( o, pos ){
switch( pos )
	{
	case 'top' : return o.geometricBounds[0];
	case 'left' : return o.geometricBounds[1];
	case 'bottom' : return o.geometricBounds[2];
	case 'right' : return o.geometricBounds[3];
	case 'hcentre' : return o.geometricBounds[1] + 
		((o.geometricBounds[3] - o.geometricBounds[1]) / 2);
	case 'vcentre' : return o.geometricBounds[0] + 
		((o.geometricBounds[2] - o.geometricBounds[0]) / 2);
	}
}


function alignType(){
var dlg = app.dialogs.add( { name: 'Align' });
with( dlg.dialogColumns.add() )
	with( borderPanels.add() )
		var userSelect = textEditboxes.add( { editContents : 'CCH' } );
if( dlg.show() )
	{
	var temp = userSelect.editContents;
	dlg.destroy();
	return temp;
	}
else
	{
	dlg.destroy();
	exit();
	}
}

function errorM( m ){
alert( m );
exit()
}