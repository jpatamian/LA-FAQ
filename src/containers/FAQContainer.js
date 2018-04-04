import React from 'react';
import Question from '../components/Question';
import TextField from '../components/FAQForm';
import { Link } from 'react-router'


class FAQContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedQuestion: null,
      questions: [],
      newQuestion: "",
      newAnswer: "",
      error: null,

    }

    this.toggleQuestionSelect = this.toggleQuestionSelect.bind(this)
    this.handleQuestionChange = this.handleQuestionChange.bind(this)
    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }

  toggleQuestionSelect(id) {
    if (id === this.state.selectedQuestion) {
      this.setState({ selectedQuestion: null})
    } else {
      this.setState({ selectedQuestion: id })
    }
  }

  componentDidMount() {
    fetch('/api/v1/questions')
      .then(response => {
        if(response.ok){
          return response;
        } else {
          let errorMessage = ('${response.status} (${response.statusText}')
          error = new Error(errormessage);
        throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        this.setState({questions:response})
      })
    }

    handleQuestionChange(event) {
      this.setState({newQuestion: event.target.value} )
      }

    handleAnswerChange(event){
      this.setState({newAnswer: event.target.value})
    }

    handleClearForm(event) {
      this.setState({newQuestion: "", newAnswer: "", error: null})
    }

    handleSubmitForm(event) {
      event.preventDefault()
      if (this.state.newQuestion === "" || this.state.newAnswer === ""){
        this.setState({error: "Please complete all form fields"})
      } else {
      let formPayload = {
        question: this.state.newQuestion,
        answer: this.state.newAnswer
      }

      fetch('/api/v1/questions', {
      method: 'POST',
      body: JSON.stringify(formPayload)
    })
      .then(response => response.json())
      .then(body => {
        this.setState({questions: this.state.questions.concat(body)})
      })
      this.handleClearForm()
      }
    }
  render() {
    console.log(this.state)
    let questions = this.state.questions.map(question => {
      let selected;
      if (this.state.selectedQuestion === question.id) {
        selected = true
      }

      let handleClick = () => { this.toggleQuestionSelect(question.id) }

      return(
        <Question
          key={question.id}
          question={question.question}
          answer={question.answer}
          selected={selected}
          handleClick={handleClick}
        />
      )
    })

    return(
      <div className='page'>
        <Link to = '/launchers'> <h1>We Are Here To Help</h1></Link>
        <div className='question-list'>
          {questions}
        </div>
        <p className= 'error'>{this.state.error}</p>
        <form className= 'newQuestion' onSubmit={this.handleSubmitForm}>
          <TextField
            label='Question'
            name='question'
            content= {this.state.newQuestion}
            handlerFunction= {this.handleQuestionChange}/>
          <TextField
          label= 'Answer'
          name='answer'
          content= {this.state.newAnswer}
          handlerFunction= {this.handleAnswerChange}/>
        <div className="button=group">
          <input className="button" type="submit" value="Submit" />
        </div>
        </form>
        <button className="button" onClick={this.handleClearForm}>Clear</button>
      </div>
    )
  }
}

export default FAQContainer;
