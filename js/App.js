
class Dato{
    constructor(descripcion, valor){
        this._descripcion = descripcion;
        this._valor = valor;
    }
    get descripcion(){
        return this._descripcion;
    }
    set descripcion(descripcion){
           return this._descripcion= descripcion;
    }
    get valor(){
        return this._valor;
    }
    set valor(valor){
      return this._valor= valor;
    }
}   


// Ingreso is Income translated from Spanish
class Ingreso extends Dato{
    static contadorIngresos = 0 ;
    
    constructor(descripcion,valor){
        super(descripcion,valor);
        this._id= ++Ingreso.contadorIngresos;
    }
    get id(){
        return this._id;
    }
}

// Egreso is Expense translated from Spanish
class Egreso extends Dato{
    static contadorEgresos =0 ;
    
    constructor(descripcion,valor){
        super(descripcion,valor);
        this._id= ++Egreso.contadorEgresos;
    }
    get id(){
        return this._id;
    }
}

let cargarApp=()=> {
    cargarCabecero();
    cargarIngresos();
    cargarEgresosHTML();
    
}

const ingresos=[
    new Ingreso('Salary ',930),

]
const egresos=[
    new Egreso('Rent',420),
    new Egreso('Car Insurance ',10),

]


let totalIngresos =()=>{
    // Function to get the total amount of Income

    let totalIngreso = 0;
    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}
let totalEgresos=()=>{
    // Function to get the total amount of Expenses
    let totalEgreso=0;
    for (let egreso of egresos){
        totalEgreso += egreso.valor; 
    }
    return totalEgreso;
}

let cargarCabecero = () =>{
   /**  Function to load up the header and the data from the total of 
     (totalIncome -totalExpenses) as well as the Porcentage from ( totalExeces -totalIncomes)
     */
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso =totalEgresos() / totalIngresos(); 
 
    document.getElementById('presupuesto').innerHTML =formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje (porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML=formatoMoneda(totalEgresos());
}

const formatoMoneda =(valor)=>{
    // Function to get the value in format currency
   return valor.toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2});

}
const formatoPorcentaje=(valor)=>{
    // Function to get the value in percentage
    return valor.toLocaleString('en-US',{style:'percent',minimumFractionDigits:2});
}

const cargarIngresos=()=>{
// Function to upload the income
    let ingresosHTML = '';
    for (let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso)
    }
    document.getElementById('lista-ingresos').innerHTML=ingresosHTML;
}

const crearIngresoHTML=(ingreso)=>{
    // Function to create an new income

    let ingresoHTML= `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
     <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
     <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn">
            <ion-icon name="close-outline"
           onclick='eliminarIngreso(${ingreso.id})' ></ion-icon>
        </button>
     </div>
    </div>
    </div>
`;
    return ingresoHTML;
}
const eliminarIngreso = (id)=>{
    // Function to eliminate an income from a list of incomes

   let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id===id);
   ingresos.splice(indiceEliminar,1);
   cargarCabecero();
   cargarIngresos();
   

}

const cargarEgresosHTML=()=>{
    // Function to upload the expenses
let egresosHTML = '';
for (let egreso of egresos){
    egresosHTML += crearEgregosHTML(egreso)
}
document.getElementById('lista-egresos').innerHTML=egresosHTML;
}


const crearEgregosHTML=(egreso)=>{
    // Function to create a new expense
    let egresoHTML=`
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-outline"
                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    
    `;
    return egresoHTML;
}
const eliminarEgreso = (id)=>{
    // Function to delete an added expense
    let indiceEliminar = egresos.findIndex(egreso => egreso.id===id);
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresosHTML();
    
 
 }
 let agregarDato = () => {
    // Function to get the value in the form and add the data from 
    //  a new income or a new expense
    let forma = document.forms.forma;
    let tipo = forma.tipo;
    let descripcion = forma.descripcion;
    let valor = forma.valor;
  
    if (tipo.value === 'ingreso') {
      ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
    
      cargarCabecero();
      cargarIngresos();
    //   crearIngresoHTML();
    
    } 
     else if (tipo.value === 'egreso') {
      egresos.push(new Egreso(descripcion.value, Number(valor.value)));
      cargarCabecero();
      cargarEgresosHTML();
    }
  
    forma.reset();
  };
  
  function botonEscondido() {
    // Function to get the introduction button desapearing 
    // after showing how it works the page
    var button = document.getElementById("liveToastBtn");
    button.style.display = "none";
  }
//   Code imported from bootstap to get a LiveToast
  const toastTrigger = document.getElementById('liveToastBtn')
  const toastLiveExample = document.getElementById('liveToast')
  if (toastTrigger) {
    toastTrigger.addEventListener('click', () => {
      const toast = new bootstrap.Toast(toastLiveExample)
  
      toast.show()
    })
  }