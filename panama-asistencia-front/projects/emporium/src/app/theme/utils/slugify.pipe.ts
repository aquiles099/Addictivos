import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'slugify'})
export class SlugifyPipe implements PipeTransform {
  transform(input: string): string {
    var tittles = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
    for (var i = 0; i < tittles.length; i++) {
        input = input.replace(tittles.charAt(i), original.charAt(i)).toLowerCase();
    };
    return input.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');
  }
}