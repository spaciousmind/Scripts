// InDesign CS5/CS5.5/CS6
// =====================================
(function(s,a,m,f,i,x)
{
    (s=s[a][f+'Window'])&&
    (s=s[a][f+'Spread'])&&
    (
        // Prevent 'locked guides' issues!
        // ---
        app.documents[x]().preferences[x]().
            properties={guidesLocked:false},

        // Retrieve the page bounds
        // ---
        a=s.pages[x]().bounds,

        // Min-max algo on page bounds
        // ---
        m=[m,m,-m,-m],
        (f=function(v,t)
        {
            while(t=a.pop(i=4))
            while(i--)
            (t[i]<m[i])^(i>>1)&&(m[i]=t[i],m[~i]=v)
        })(),

        // Min-max algo on page items bounds
        // ---
        a=s.pageItems[x]().visibleBounds,f(1)
    )

    // OK, create the guides where needed
    // ---
    while(i--)m[~i]&&
    s.guides.add({location:m[i],
        orientation:1&i?1986359924:1752134266})

})(app,'properties',1/0,'active',0,'everyItem');
