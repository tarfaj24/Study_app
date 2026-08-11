export function displayError(errorText, parentElement, id){
    if (document.querySelector(`#${id}`)){
        document.querySelector(`#${id}`).innerText = errorText;
        return
    }
    const errorElement = document.createElement('div');
    errorElement.innerText = errorText;
    errorElement.id = id;
    errorElement.classList.add('text-danger')
    parentElement.appendChild(errorElement)
}