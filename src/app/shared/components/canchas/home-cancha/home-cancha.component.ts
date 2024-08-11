import { Component } from '@angular/core';
import { CanchaService } from '../../../../core/services/cancha.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-cancha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-cancha.component.html',
  styleUrl: './home-cancha.component.css'
})
export class HomeCanchaComponent {
  
  canchas: any ; 
  canchaEditar: any;
  filtroCancha: any;
  modoOculto: boolean = true;
  constructor(private canchaService: CanchaService) {
  }
  
  ngOnInit() {
   this.getData();
  }
  
  //listar canchas
  getData(){
    this.canchaService.getData().subscribe(data => {
      this.canchas = data;
      this.filtroCancha = data;
      
    })
  }
  
  //eliminar canchas
  eliminarPorId(id: number) {
    console.log(id)
    this.canchaService.eliminarPorId(id).subscribe(
      (response) => {
      console.log('cancha eliminada correctamente');
      this.getData();
    }, error => {
      console.error('Error al eliminar cancha:', error);
    });
  }

  //pendiente funcion buscar
  buscar(texto: Event) {
  }

  //modo edicion
  toggleModoEdicion(cancha: any) {
    this.canchaEditar = cancha;
    this.editarModoOcuto()
    //verificar si se actualizo
    console.log("", this.canchaEditar);
  }

  //mostrar / ocultar formulario
  editarModoOcuto(){
    this.modoOculto = !this.modoOculto;
    this.getData();
  }
}
