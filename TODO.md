# Tasks

## Transform hour numbers into note names

Possible approaches:

* Override `<Mark>` component.
* Continue researching if `formatHour` function can do this.
* Replace hour number values after clock is rendered.

```
const notes = ['C#','D','D#','E','F','F#','G','G#','A','A#','B','C'];
let numbers = document.getElementsByClassName("react-clock__mark__number");
for (let i = 0; i < numbers.length; i++) {
    numbers.item(i).innerHTML = notes[i];
}
````
