
export class MddUtils {

    // Checks if the string contains html
    public static isHTML = (str: string): boolean => {
        const fragment = document.createRange().createContextualFragment(str);
        // remove all non text nodes from fragment
        fragment.querySelectorAll('*').forEach(el => el.parentNode.removeChild(el));
        // if there is textContent, then not a pure HTML
        return !(fragment.textContent || '').trim();
    }

    public static generateDateString = (): string => {
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
        return dateStr;
    }
}