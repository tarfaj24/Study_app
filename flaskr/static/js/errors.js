export function displayFetchError(errorText, parentElement, id){
    if (document.querySelector(`#${id}`)){
        return
    }
    const errorElement = document.createElement('div');
    errorElement.innerText = errorText;
    errorElement.id = id;
    errorElement.classList.add('text-danger')
    parentElement.appendChild(errorElement)
}