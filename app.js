// Función para guardar las tareas en localStorage
function guardarTareas() {
    // Obtenemos la lista de tareas (ul)
    let ul = document.getElementById('listaTareas');
    let tareas = [];
    
    // Recorremos todas las tareas (li) y las guardamos en un array
    let lis = ul.getElementsByTagName('li');
    for(let i = 0; i < lis.length; i++) {
        let li = lis[i];
        let span = li.getElementsByTagName('span')[0]; // Obtenemos el texto de la tarea
        let checkBox = li.getElementsByTagName('input')[0]; // Obtenemos el estado del checkbox
        
        // Añadimos la tarea al array
        tareas.push({
            texto: span.textContent,
            completado: checkBox.checked
        });
    }
    
    // Guardamos el array de tareas en localStorage
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para cargar las tareas desde localStorage
function cargarTareas() {
    // Obtenemos la lista de tareas (ul)
    let ul = document.getElementById('listaTareas');
    let tareas = JSON.parse(localStorage.getItem('tareas')) || []; // Cargamos las tareas del localStorage o inicializamos con un array vacío
    
    // Limpiar la lista antes de agregar las tareas
    ul.innerHTML = '';
    
    // Recorremos el array de tareas y las añadimos a la lista
    tareas.forEach(tarea => {
        let li = document.createElement('li');

        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = tarea.completado; // Establecemos el estado del checkbox

        let span = document.createElement('span');
        span.textContent = tarea.texto; // Establecemos el texto de la tarea
        span.classList.add('spanContenido');

        // Aplicamos el estilo en función del estado del checkbox
        if (checkBox.checked) {
            span.style.color = 'grey';
            span.style.textDecoration = 'line-through';
        } else {
            span.style.color = 'black';
            span.style.textDecoration = 'none';
        }

        let buttonDelete = document.createElement('button');
        buttonDelete.classList.add('btn', 'btn-eliminar');

        let buttonEdit = document.createElement('button');
        buttonEdit.classList.add('btn', 'btn-editar');

        // Añadimos un evento para eliminar la tarea
        buttonDelete.addEventListener('click', function() {
            ul.removeChild(li); // Eliminamos el elemento de la lista
            guardarTareas(); // Actualizamos el localStorage
        });

        // Añadimos un evento para editar la tarea
        buttonEdit.addEventListener('click', function() {
            let textoValorButton = prompt('Edita tu tarea: ', span.textContent);

            if(textoValorButton !== null && textoValorButton.trim() !== '') {
                span.textContent = textoValorButton.trim(); // Actualizamos el texto de la tarea
                guardarTareas(); // Actualizamos el localStorage
            }
        });

        // Añadimos un evento para marcar/desmarcar la tarea como completada
        checkBox.addEventListener('click', function(e) {
            if(checkBox.checked) {
                span.style.color = 'grey';
                span.style.textDecoration = 'line-through'; // Aplicamos estilo para tareas completadas
            } else {
                span.style.color = 'black';
                span.style.textDecoration = 'none'; // Aplicamos estilo para tareas no completadas
            }
            guardarTareas(); // Actualizamos el localStorage
        });

        li.append(checkBox, span, buttonDelete, buttonEdit); // Añadimos los elementos al <li>

        ul.appendChild(li); // Añadimos el <li> a la lista de tareas
    });
}

// Llamamos a cargarTareas cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    cargarTareas();
});

// Manejar el formulario de nueva tarea
document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    let textoTarea = document.getElementById('tarea');
    let textoTareaValor = textoTarea.value.trim(); // Obtenemos el valor de la tarea

    if(textoTareaValor) {
        let ul = document.getElementById('listaTareas');

        // Verificar si la tarea ya existe
        let tareas = ul.getElementsByTagName('li');
        for(let i = 0; i < tareas.length; i++) {
            let span = tareas[i].getElementsByTagName('span')[0];
            if(span.textContent.trim() === textoTareaValor) {
                alert('Esta tarea ya existe en la lista.'); // Mensaje de alerta si la tarea ya existe
                textoTarea.value = ''; // Limpiamos el campo de entrada
                return; 
            }
        }

        let li = document.createElement('li');

        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';

        let span = document.createElement('span');
        span.textContent = textoTareaValor;
        span.classList.add('spanContenido');

        let buttonDelete = document.createElement('button');
        buttonDelete.classList.add('btn', 'btn-eliminar');

        let buttonEdit = document.createElement('button');
        buttonEdit.classList.add('btn', 'btn-editar');

        // Añadimos un evento para eliminar la tarea
        buttonDelete.addEventListener('click', function() {
            ul.removeChild(li); // Eliminamos el elemento de la lista
            guardarTareas(); // Actualizamos el localStorage
        });

        // Añadimos un evento para editar la tarea
        buttonEdit.addEventListener('click', function() {
            let textoValorButton = prompt('Edita tu tarea: ', span.textContent);

            if(textoValorButton !== null && textoValorButton.trim() !== '') {
                span.textContent = textoValorButton.trim(); // Actualizamos el texto de la tarea
                guardarTareas(); // Actualizamos el localStorage
            }
        });

        // Añadimos un evento para marcar/desmarcar la tarea como completada
        checkBox.addEventListener('click', function(e) {
            if(checkBox.checked) {
                span.style.color = 'grey';
                span.style.textDecoration = 'line-through'; // Aplicamos estilo para tareas completadas
            } else {
                span.style.color = 'black';
                span.style.textDecoration = 'none'; // Aplicamos estilo para tareas no completadas
            }
            guardarTareas(); // Actualizamos el localStorage
        });

        li.append(checkBox, span, buttonDelete, buttonEdit); // Añadimos los elementos al <li>

        ul.appendChild(li); // Añadimos el <li> a la lista de tareas

        textoTarea.value = ''; // Limpiamos el campo de entrada

        // Guardamos las tareas después de agregar una nueva
        guardarTareas();
    }
});
