import { getPage } from './containers.js' ;
import { navigate, loadPage } from './navigating.js';
import { pomodoro } from './pages_js/pomodoro.js';




document.addEventListener('DOMContentLoaded', (event) => {
    const page_names = Array.from(document.querySelectorAll('.nav-link')).map(node => node.id);
    console.log(page_names);
    const current_page = window.location.pathname.slice(1)
    if (page_names.includes(current_page))
    {   
        const page_function = window[current_page]
        console.log(typeof page_function)
        console.log('yes is in pages')
        loadPage(getPage(current_page));
    }
    else{
        console.log('No isnt')
        loadPage(getPage('home'));
    }
    navigate();
    });


// window.addEventListener('popstate', async function(event) {
//       loadPage(window.location.pathname);
//     });

