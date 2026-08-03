function loadPage(page, pages){
    document.querySelector('#main_container').innerHTML = pages[page];  
}

function navigate(pages){
    tabs = document.querySelector('#main_nav');
    tabs.addEventListener('click', function(e){
        switch (e.target.id)
        {
            case 'logo':
                console.log('home');
                history.pushState(null, null, '/home');
                loadPage('home', pages);
                break;

            case 'home':
                console.log('home');
                history.pushState(null, null, '/home');
                loadPage('home', pages);
                break;

            case 'page_1':
                console.log('page_1');
                history.pushState(null, null, '/page_1');
                loadPage('page_1', pages);
                break;

            case 'page_2':
                console.log('page_2');
                history.pushState(null, null, '/page_2');
                loadPage('page_2', pages);
                break;
        }
    })

}



document.addEventListener('DOMContentLoaded', (event) => {
    if (window.location.pathname != '/login')
    {
        const pages = {
        home: '<div> Welcome this is home </div>',
        page_1: '<div> Welcome this is page_1 </div>',
        page_2: '<div> Welcome this is page_2 </div>',
        }

    
        // load the page the user wants to see else load home
        

        if (window.location.pathname.slice(1) in pages)
        {
            loadPage(window.location.pathname.slice(1), pages);
        }
        else{
            loadPage('home', pages);
        }
        
        
        // navigation
        navigate(pages);
    }
   
});


// history.pushState(null, null, '/data');
// window.addEventListener('popstate', async function(event) {
//       loadPage(window.location.pathname);
//     });
// window.location.pathname
