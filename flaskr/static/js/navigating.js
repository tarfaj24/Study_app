import { getPage } from './containers.js' ;
import { pomodoro, destroyPomodoro } from './page_specific_js/pomodoro.js' ;
import { note_creator } from './page_specific_js/note_creator.js';

export function loadPage(page){
    document.querySelector('#main_container').innerHTML = page;  
}

function destroyPageJsByName(page){
    switch (page){
        case 'pomodoro':
            destroyPomodoro();
            break;
    }
}

export function executePageJsByName(page){
    console.log('executing: ', page)
    switch (page){
        case 'pomodoro':
            pomodoro();
            break;
        case 'note_creator':
            note_creator();
            break;
    }
}

export function navigate(){
    console.log('navigation-start')
    const tabs = document.querySelector('#main_nav');
    tabs.addEventListener('click', function(e){
        const last_page_name = window.location.pathname.slice(1)
        destroyPageJsByName(last_page_name);
        let page_name = e.target.id;
        console.log('current page is: ', page_name)
        if (page_name != window.location.pathname.slice(1)){
            if (page_name === 'logo'){
                page_name = 'home';
            }   
            history.pushState(null, null, '/' + page_name);
            loadPage(getPage(page_name));
            executePageJsByName(page_name);
            
        }
            
            
            
        
        
    })
}

