function getStory(/*?any*/x)
//----------------------------------
{
    x||((x=app.properties.selection)&&(x=x[0]));
    if( x!==Object(x) || !('toSpecifier' in x) ) return false;
 
    // Text objects already have a parentStory!
    // ---
    if( 'parentStory' in x ) return x.parentStory;
 
    x = x.toSpecifier()
        .match(/\/document\[.+?\/\/text-frame\[@id=\d+\]/);
 
    if( !x || !(x=resolve(x[0])).isValid ) return false;
    return x.parentStory;
};