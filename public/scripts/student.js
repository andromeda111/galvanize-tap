////////////////////////////
// student Class
////////////////////////////
function studentFactory () {
  let id = 1

class Student {
  constructor(name = '', type = 'good', points = 1, health = {current: 3, max: 10}, img = '', reset = 3) {
    this.id = id++
    this.name = name
    this.type = type
    this.points = points
    this.health = health
    this.id = id
    this.img = img
    this.reset = reset
    this.renderer = new StudentRender(this)
  }

  static new (name, type) {
    switch (type) {
      case 'great':
        return new Great(name)
        break;
      case 'good':
        return new Good(name)
        break;
      case 'meh':
        return new Meh(name)
        break;
      case 'terrible':
        return new Terrible(name)
        break;
      default:
        return new Great(name)
    }
  }

  increaseHealth() {
    if (this.health.current !== 0 && this.health.current !== this.health.max) {
      this.health.current += 1
      if (this.health.current > this.health.max) {
        this.health.current = this.health.max
      }
        this.render()
      return
    } else {
      console.log('student is dead')
        this.render()
      return
    }

  }

  decreaseHealth() {
    if (this.health.current > 0) {
      this.health.current -= 1
      console.log(`${this.name} health decreased`);
      this.render()
      return
    } else {
      console.log('student died')
      this.render()
      return
    }

  }

  render() {
    this.renderer.render()
  }
}
return Student
}
const Student = studentFactory()


////////////////////////////
// student RenderClass
////////////////////////////

class StudentRender {
  constructor (student) {
    this.$container = $('main section')
    this.student = student
  }

  render () {
    console.log('test');
    this.studentArticle()
    this.setHealth()
    if (this.student.health.current <= 0) {
      this.student.$self.addClass('dead')
      this.student.$self.find('a').text('Browsing Reddit')
      this.student.$self.find('a').attr('disabled', true)
    }
  }

  studentArticle() {
    const dead = this.student.health.current <= 0 ? 'dead' : ''
    const nameFix = this.student.type[0].toUpperCase() + this.student.type.slice(1)
    const $student = $(`<article class="student card center-align ${dead}">
      <div class="gif">${this.student.img}</div>
      <span class="card-title">${this.student.name}</span>
      <div class="card-content">
        <div class="chip">Emotional State: ${nameFix}</div>
        <div class="chip">+${this.student.points}</div>
      </div>
      <div class="card-action water"></div>
      <a href="#" class="z-depth-0 blue lighten-1 btn">Give JavaScript</a>
    </article>`)

    this.student.$self = $student
    this.$container.append($student)
  }

  setHealth () {
      const $healthBar = this.student.$self.find('.water').first()
      $healthBar.empty()

      for (let i = 0; i < this.student.health.max; i++) {
        const $icon = $(`<img src="./images/js-icon1.png">`)

        if (this.student.health.current > i) {
          // $icon.addClass('blue pulse')
        } else {
          $icon.addClass('grayscale')
        }

        $healthBar.append($icon)
      }
    }

  }
