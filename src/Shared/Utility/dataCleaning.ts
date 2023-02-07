export function stripHtml(subject: string): string {
    var tmp = document.createElement('div');
    tmp.innerHTML = subject;
    
    return tmp.textContent || tmp.innerText;
}