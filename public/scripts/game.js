

var timer;

////////////////
// Game Render class
///////////////

class GameRender {
  constructor (game) {
    this.$statsAside = $('main aside')
    this.$main = $('main section')
    this.game = game
    this.intitialized = false
  }

  render() {
    //check if game started
    if (!this.initialized) {
      this.appendGameStats()
      this.appendForm()
      this.initForm()
      this.initStart()
      this.initViewScores()
      this.initialized = true
    }
    this.addStudents()
    this.setStudentNumber()
    this.setScore()
    this.setDays()
    this.setWater()
  }

  addStudents() {
    this.$main.empty()
    this.game.students.forEach(student => {
      student.render()
      student.$self.find('a').on('click', (event) => {
        event.preventDefault()
        if (student.health.current === student.health.max) {
          console.log('NO!!!!!');
          this.render()
        } else {
          this.game.waterStudent(student)
          this.render()
        }
        //
        // this.render()
      })
    })
  }

  appendGameStats () {
  let $stats = $(`<div class="row">

    <h3 class="white-text"><img src="./images/galvanize-logo.svg">Tap</h3>
    <h5 class="orange-text student-count"><span>0</span> Student(s)</h5>
    <h5 class="orange-text score-count"><span>0</span> Points</h5>
    <p class="orange-text">JavaScripts</p>
    <h5 class="orange-text water-count"></h5>
    <p class="orange-text days"><span>0</span> Days Left</p>
    <div class="alert-box weekend">Weekend - Extra JavaScripts!!</div>
    <div class="alert-box break">Break Week - Full JavaScripts!!</div>
    <div class="progress white lighten-3">
      <div class="determinate orange"></div>
    </div>
    <button type="button" name="button" id="start"
      class="btn blue-grey darken-1">
      <i class="material-icons right">play_arrow</i> Start
    </button>
    <br>
    <a id="view-scores" href="/">View High Scores</a>
  </div>`)

  this.$statsAside.append($stats)
}

appendForm () {
  let $form = $(`<div class="row">
    <form class="col s12">
      <div class="row">
        <p class="title orange-text center-align">Enroll a New Student</p>
        <div class="input-field col s6">
          <input id="name" type="text" required>
          <label for="name">Name</label>
        </div>
        <div class="input-field col s6 drop-font">
          <select id="type" class="browser-default" required>
            <option value="" disabled selected>Emotional State</option>
            <option value="great">Great!</option>
            <option value="good">Good</option>
            <option value="meh">Meh</option>
            <option value="terrible">Terrible</option>
          </select>
        </div>
      </div>
      <div class="row">
        <button type="submit" class="btn col s12 orange lighten-1 enroll-btn" name="button" disabled="true">Enroll</button>
      </div>
    </form>
  </div>`)

  this.$statsAside.append($form)
}

  initForm () {
  $('form').on('submit', (e) => {
    e.preventDefault()

    let [name, type] = [$('#name').val(), $('#type').val()]
    $('#name').val('')
    $('#type').val('')

    let newStudent = Student.new(name, type)
    this.game.add(newStudent)
    this.render()
    })
  }

  initStart() {
    $('#start').on('click', () => {
      this.game.start()
      $('#start').attr('disabled', true)
      $('.enroll-btn').attr('disabled', false)
    })
  }

  initViewScores() {
    $('#view-scores').on('click', (e) => {
      e.preventDefault()
      $('#start').attr('disabled', true)
      this.viewScores()
    })
  }

  viewScores() {
    $('main section').empty()
    $('main section').append(`<div class="gameover"><h2 class="orange-text">Game Over</h2></div><div class="end-score"><a href="/">Play Again</a><br><p>Top 10 High Scores:</p><table><col width="50%"><col width="50%"><tr><th>Name</th><th>Score</th></tr></table><table class="score-list"></table></div>`)

    // Ajax Call for Database Score Info Here
    var scoreArray = []
      $.ajax({
        url: 'https://galvanize-tap.herokuapp.com/score',
        method: 'GET',
        json: true
      }).then(data => {
        scoreArray = data
        $('.score-list').empty()
        scoreArray.forEach(el => {
          $('.score-list').append(`<tr><td width="50%">${el.name}</td><td width="50%">${el.score}</td></tr>`)
        })
      })
    }

  // Set Stuff - below here

  setScore() {
    $('.score-count span').replaceWith(`<span>${this.game.total}</span>`)
  }

  setDays() {
    $('.days span').replaceWith(`<span>${this.game.days}</span>`)
  }

  setStudentNumber() {
    $('.student-count span').replaceWith(`<span>${this.game.students.length}</span>`)
  }

  setTimer() {
    $('.progress').replaceWith(`<div class="progress white lighten-3">
        <div class="determinate orange" style="width: ${this.game.turn}%">></div>
    </div>`)
  }

  // figure out later
  setWater() {
    $('.water-count').empty()

    for (let i = 0; i < this.game.water.max; i++) {
      var waterIcon = $(`<img src="./images/js-icon.png">`)
      if (this.game.water.current <= i) {
        waterIcon.addClass('grayscale')
      }

      $('.water-count').append(waterIcon)
    }

    if (this.game.water.current === 0) {
      $('.student:not(.dead) a').attr('disabled', true)
    } else {
      $('.student:not(.dead) a').attr('disabled', false)
    }
  }

  // Game Over
  gameOver() {
    $('.enroll-btn').attr('disabled', true)
    $('main section').empty()
    $('main section').append(`<div class="gameover"><h2 class="orange-text">Game Over</h2></div><div class="end-score"><a href="/">Play Again</a><br><p>Top 10 High Scores:</p><table><col width="50%"><col width="50%"><tr><th>Name</th><th>Score</th></tr></table><table class="score-list"></table></div>`)

    // Ajax Call for Database Score Info Here
    //// Post score
    var scoreName = prompt('What is your name?')
    var scoreObj = {
      name: scoreName,
      score: this.game.total
    }
    var scoreArray = []
    var playerScore = []
    var finalScore;
    console.log('making post request');
    console.log(scoreObj);
    $.ajax({
      url: 'https://galvanize-tap.herokuapp.com/score',
      method: 'POST',
      data: scoreObj
    }).then(result => {
      playerScore = result
      $.ajax({
        url: 'https://galvanize-tap.herokuapp.com/score',
        method: 'GET',
        json: true
      }).then(data => {
        console.log('logging data on Ajax');
        console.log(data);
        scoreArray = data
        $('.score-list').empty()
        scoreArray.forEach(el => {
          console.log('gtting here');
          console.log(el);
          $('.score-list').append(`<tr><td width="50%">${el.name}</td><td width="50%">${el.score}</td></tr>`)
        })
        finalScore = playerScore[0]
        console.log(finalScore);
        $('.end-score').prepend(`<p><strong>Your Score:</strong> ${finalScore.name} | ${finalScore.score}</p>`)
        })
      });
}
}

////////////////
// GAME class
///////////////

class Game {
  constructor(total = 0, turn = 100, students = [], maxSize = 6, water = {current: 4, max: 8 , refill: 3}, days = 45) {
    this.total = total
    this.turn = turn
    this.students = students
    this.maxSize = maxSize
    this.water = water
    this.days = days
    this.renderer = new GameRender(this)
  }

  init () {
  this.renderer.render()
  }

  start () {
  this.timer = this.initCounter()
  }

  stop () {
    clearInterval(this.timer)
  }

  initCounter () {
    return setInterval(() => {
      console.log('Total Current Turns: ' + this.turn);
      this.turn -= 1
      if (this.turn !== 0) {
        this.renderer.setTimer()
      } else {
        if (this.days > 1) {
          this.turn = 100
          this.days -= 1
          this.students
          .filter(student => student.health.current > 0)
          .forEach(student => this.total += student.points)
          this.decreaseStudentsHealth()
          this.refill()
          if (this.days % 5 === 0 && this.days !== 25) {
            $( "div.weekend" ).fadeIn( 300 ).delay( 3750 ).fadeOut( 400 );
            this.water.current += 1
          }
          if (this.days === 25) {
            $( "div.break" ).fadeIn( 300 ).delay( 3750 ).fadeOut( 400 );
            this.water.current = this.water.max
          }
          if (this.days === 30 || this.days === 15) {
            var i;
            for (i = this.students.length - 1; i >= 0; i -= 1) {
              if (this.students[i].health.current <= 0) {
                  this.students.splice(i, 1);
              }
            }
          }
          this.renderer.render()
          if (this.students
          .filter(student => student.health.current > 0).length === 0) {
            alert('Game Over: All students are browsing Reddit.');
            this.stop()
            this.renderer.gameOver()
          }
        } else {
          this.days -= 1
          this.stop()
          alert('Game Over!');
          this.renderer.gameOver()
        }
      }
    }, 35)
  }

  // WORKING - No need to mess with
  add(newStudent) {
    if (this.students.length < this.maxSize) {
      this.students.push(newStudent)
    }

    return this
  }

  decreaseStudentsHealth () {
    this.students.forEach(student => {
      student.decreaseHealth()
    })
    return this
  }

  refill () {
    var water = this.water

    water.current += this.water.refill

    if (water.current > water.max) {
        water.current = water.max
      }

    return this
  }

  score () {
    this.students.filter(student => {
      if (student.health.current > 0) {
        return student
      }
    })
    .forEach(student => {
      if (student.health.current !== 0)
      this.total += student.points
    })
    return this
  }

  waterStudent (student) {
    if (this.water.current !== 0) {
      this.water.current--
      student.increaseHealth()
    }
    return this
  }
  // End of Class
}
