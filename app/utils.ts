
export class MddUtils {

    // Checks if the string contains html
    public static isHTML = (str: string): boolean => {
        const fragment = document.createRange().createContextualFragment(str);
        // remove all non text nodes from fragment
        fragment.querySelectorAll('*').forEach(el => el.parentNode.removeChild(el));
        // if there is textContent, then not a pure HTML
        return !(fragment.textContent || '').trim();
    }
}