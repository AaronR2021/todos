import React from 'react'
function ListOfTodos({props,closeLogic,checkLogic}) {
    const {checked}=props;
    const {id}=props;
    const {todo}=props;
    return (
        <div className='indivisualTodo'>
            
            <div className={`radio ${checked?'selected':''}`} onClick={(val)=>checkLogic({id})}>{/*add onclick function */}
           {
//<i className="fas fa-check"></i>
           } 
            </div>
            
           <p>{todo}</p>{/*add onclick function same as to toggle */}
           <span className='completed-indivisual-todo' onClick={(val)=>closeLogic({id})}><h2  className='completed-indivisual-todo-h2'>X</h2></span>
        </div>
    )
}

export default ListOfTodos;
