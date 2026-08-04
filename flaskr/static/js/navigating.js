import { getPage } from './containers.js' ;
import { pomodoro } from './pages_js/pomodoro.js' ;

export function loadPage(page){
    document.querySelector('#main_container').innerHTML = page;  
    console.log('page is home')
}

export function navigate(){
    console.log('navigation-start')
    const tabs = document.querySelector('#main_nav');
    tabs.addEventListener('click', function(e){
        if (e.target.id != window.location.pathname.slice(1)){
            console.log(e.target.id)
            switch (e.target.id){
                case 'logo':
                    console.log('home');
                    history.pushState(null, null, '/home');
                    loadPage(getPage('home'));
                    break;

                case 'home':
                    console.log('home');
                    history.pushState(null, null, '/home');
                    loadPage(getPage('home'));
                    break;

                case 'page_1':
                    console.log('page_1');
                    history.pushState(null, null, '/page_1');
                    loadPage(getPage('page_1'));
                    break;

                case 'pomodoro':
                    console.log('pomodoro');
                    history.pushState(null, null, '/pomodoro');
                    loadPage(getPage('pomodoro'));
                    pomodoro();
                    break;
            }
        }
        
    })

}
