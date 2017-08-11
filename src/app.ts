import Vue from 'vue';
import Component from 'vue-class-component';
import style from './app.scss';

@Component({})
class App extends Vue {
  render(h) {
    return h(
      'div',
      {
        class: {
          [style.red]: true,
        },
      },
      ['Background should be lightblue.'],
    );
  }
}

export default () =>
  new Vue({
    render: h => h(App),
  });
