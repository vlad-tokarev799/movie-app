export default class TextFormatService {
  truncate(str: string, length: number): string {
    const text = str.slice(0, length);
    const a = text.split(' ');
    a.splice(a.length - 1, 1);
    const res = a.join(' ');
    return `${res} ...`;
  }
}
