import ListOfTodos from './components/ListOfTodos.js';
import {useState,useEffect} from 'react';

function App() {
  //toggle theme
  function toggleTheme(){
    const body=document.querySelector('.body');
    body.classList.toggle('dark')

    const bodyComponent=document.querySelector('body');
    bodyComponent.classList.toggle('light')
  }

  //HOOKS
  //hold all info-hooks
  const [allList, setallList] = useState([]);
  //display info-hooks
  const [todos, settodos] = useState([]);

  //how many incomplete
  const [incompleteTodo, setIncompleteTodo] = useState(0);



  //USEEFFECT
  //useEffects to get data from localStorage
  useEffect(() => {
    const todolist=JSON.parse(window.localStorage.getItem('todos'))
    console.log(todolist,'this is got from local storage');
    settodos(todolist);
    setallList(todolist);
  },[]); 

  //useeffect to save data to localStorage
  useEffect(() => { 
    console.log(allList,'this is saved in local storage');
    localStorage.setItem("todos", JSON.stringify(allList));
   }, [{allList}])

  //useeffect to show number of todos left
  useEffect(() => { 
    if({allList}){
      const activearray=allList.filter(todo=>todo.checked===false);
      setIncompleteTodo(activearray.length);
    }

   }, [{allList}])

  //eventListner
  useEffect(() => {
    function handleKeyUp(event) {
      if (event.keyCode === 13) {
        input.value='';
      }
    }
    var input = document.querySelector(".input-search");
    input.addEventListener("keyup",handleKeyUp);
    return () => input.removeEventListener("keyup", handleKeyUp)
  }, [])


 /*METHODS*/
  //closeLogic
  const closeLogic=(id)=>{
    if({todos}){
      const newArray=todos.filter(todo=>todo.id!==id.id)
      console.log(newArray,'todos that are not deleted');
      settodos(newArray);
      setallList(newArray);
    }    
  }

  //searchLogic
  function searchLogic(e){
    //get value
    e.preventDefault();
    const value=e.target[0].value;
    console.log(allList,'all list');
    //update allList
    if(allList){
      const newArray={allList}.allList.push({
        //todo 
        id:Math.floor(
          (Math.random()*100000)+1
        ),
        todo:value,
        checked:false
      })
    }
    
    //add value to display-todos
    settodos([...allList]);
  }

  //toggle checkLogic
  const checkLogic=({id})=>{
    if(todos){
      const newArray1=todos.map(todo=>{
        if(todo.id===id){
          todo.checked=!todo.checked
          return todo
        }
        else{
          return todo
        }
      })
      settodos(newArray1);
      setallList(newArray1)
    }
  }

  //select-tags
  function addClassSelected(){
    const sections=document.querySelectorAll('.select-option');
    for (var i = 0; i < sections.length; i++){

      sections[i].classList.remove('selected-footer-btn');

  }

  }

  //displayAllLogic
  function displayAllLogic(){
  addClassSelected();
  document.querySelector('.all').classList.add('selected-footer-btn')
    settodos(allList)
  }

  //activeAllLogic
  function ActiveLogic(){
if({allList}){
  addClassSelected()
  document.querySelector('.active').classList.add('selected-footer-btn')
  const activearray=allList.filter(todo=>todo.checked===false);
  settodos(activearray)
}
  }

  //completedLogic
  function CompletedLogic(){
    if({allList}){
      addClassSelected()
      document.querySelector('.completed').classList.add('selected-footer-btn')
  
      const activearray=allList.filter(todo=>todo.checked===true);
      settodos(activearray)
    }
  }

  //clearAllLogic
  function clearCompletedLogic(){
    if({allList}){
      const activearray=allList.filter(todo=>todo.checked===false);
      settodos(activearray);
      setallList(activearray);
    }
  }



  return (
    <>
    <div className='body dark'>
      <div className='hero-head '>
      </div>
      <div className='hero-tail'>
          <div className='todos-outline'>
            <div className='todo-title'>
              <h1 className='title-text'>Todo List</h1>
              <div className='toggle-theme-icon' onClick={toggleTheme}></div>
            </div>
            <div className='search_bar'>
              <form onSubmit={searchLogic}>
                <input type="search" className="input-search"required="required" placeholder='Enter your todo for today' />
                <input type='submit' className='submit'/>
              </form>
            </div>

              <div className='todo_list'>
              {
                todos?todos.map(todo=><ListOfTodos
                                              key={todo.id}  
                                              props={todo}
                                              closeLogic={closeLogic}
                                              checkLogic={checkLogic}
                                          />) : ''
              }
              </div>
              <div className='footer-todo-list'>
                  <div className='footer-box incomplete-number style-text-new' >{incompleteTodo} left</div>

                  <div className='footer-box  buttons-modify-list'>
                    <button className='btn-footer select-option  all style-text-new selected-footer-btn' onClick={displayAllLogic}>All</button>
                    <button className='btn-footer select-option active style-text-new' onClick={ActiveLogic}>Active</button>
                    <button className='btn-footer select-option completed style-text-new'onClick={CompletedLogic}>Completed</button>
                  </div>

                  <div className=' footer-box buttons-clear-all'>
                    <button className='btn-footer style-text-new' onClick={clearCompletedLogic}>Clear Completed</button>

                  </div>
              </div>
          </div>
      </div>
    </div>
    </>
  );
}

export default App;
