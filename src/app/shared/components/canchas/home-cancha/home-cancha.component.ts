import { Component } from '@angular/core';

@Component({
  selector: 'app-home-cancha',
  standalone: true,
  imports: [],
  templateUrl: './home-cancha.component.html',
  styleUrl: './home-cancha.component.css'
})
export class HomeCanchaComponent {
  
  canchas: any ; 
  canchaEditar: any;
  filtroCancha: any;
  constructor() {
  }
  ngOnInit() {
   this.getData();
  }
  
  getData(){
 
  }
  
  eliminarPorId(id: number) {
 
  }
  buscar(texto: Event) {

  }

  toggleModoEdicion(cancha: any) {


}
}
