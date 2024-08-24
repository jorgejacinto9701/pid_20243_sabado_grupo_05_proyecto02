import { User } from '../../../model/user';
import { Component, OnInit } from '@angular/core';
import { Sede } from "../../../model/Sede";
import { Cancha } from "../../../model/Cancha";
import { Reserva } from '../../../model/Reserva';
import { ReservaService } from "../../../core/services/reserva.service";
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-reserva',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NgIf, NgFor],
  templateUrl: './registro-reserva.component.html',
  styleUrls: ['./registro-reserva.component.css']
})
export class RegistroReservaComponent implements OnInit {

  selectedSedeObject: Sede | undefined;
  selectedCanchaObject: Cancha | undefined;
  selectedUserObject: User | undefined;

  cantidadHoras: number = 0; // Número de horas calculadas
  resultado: number = 0; // Resultado del cálculo

  usuarios: User[] = [];

  sedes: Sede[] = [];
  canchas: Cancha[] = [];
  horarios: any[] = [];
  selectedSede: number | null = null;
  selectedCancha: number | null = null;
  selectedHorarios: any[] = [];

  reserva: Reserva = {
    id: null,
    sede: null as unknown as Sede,
    cancha: null as unknown as Cancha,
    usuario: null as unknown as User,
    fecha: '',
    horaInicio: '',
    horaFin: '',
    medioPago: '',
    cantidadHoras: 0,
    precioUnitario: 0.00
  };

  isModalVisible = false;

  constructor(private reservaService: ReservaService ,  private authService: AuthService,private router: Router) { }

  validateSede() {
    const isValid = this.selectedSede !== null && this.selectedSede !==0;
    return isValid;
  }

  ngOnInit(): void {
    this.loadSedesActivas();
  }

  loadSedesActivas() {
    this.reservaService.getSedesActivas().subscribe({
      next: (sedes: Sede[]) => {
        this.sedes = sedes;
        console.log('Sedes activas cargadas:', this.sedes);
      },
      error: (err) => {
        console.error('Error al cargar sedes activas:', err);
      }
    });
  }

  onSedeChange(event: any) {
    console.error('SELECCIONA SEDE');
    const sedeId = Number(event.target.value);
    if (sedeId) {
      this.reservaService.getSede(sedeId).subscribe({
        next: (data) => {
          this.selectedSedeObject = data;
          // Llamar a cargar canchas activas de la sede seleccionada
          this.loadCanchasActivas(sedeId);
        },
        error: (err) => {
          console.error('Error al cargar la sede:', err);
        }
      });
    }

    const currentUser = this.authService.currentUserValue?.email;
    if (currentUser) {
      this.reservaService.getUsuario(currentUser).subscribe({
        next: (user) => {
          this.selectedUserObject = user;
        },
        error: (err) => {
          console.error('Error al obtener el usuario:', err);
        }
      });
    }
  }


  onCanchaChange(event: any) {
    console.error('SELECCIONA CANCHA');
    const canchaId = Number(event.target.value);
    if (canchaId) {
      this.reservaService.getCancha(canchaId).subscribe({
        next: (data) => {
          this.selectedCanchaObject = data;
          this.calculateResultado();
        },
        error: (err) => {
          console.error('Error al cargar la cancha:', err);
        }
      });
    }
  }


  // Método para actualizar la cantidad de horas
   updateCantidadHoras(cantidad: number) {
    this.cantidadHoras = cantidad;
    this.calculateResultado();
  }

  calculateResultado(){
     // Solo realiza el cálculo si ambos valores están definidos
     if (this.selectedCanchaObject && this.cantidadHoras > 0) {
      this.resultado = this.cantidadHoras * this.selectedCanchaObject.precio;
    } else {
      this.resultado = 0;
    }
  }

  get resultadoTexto(): string {
    return `S/. ${this.resultado.toFixed(2)}`;
  }


  loadCanchasActivas(sedeId: number) {
    this.reservaService.getCanchasActivasDeSede(sedeId).subscribe({
      next: (canchas: Cancha[]) => {
        this.canchas = canchas;  // Ahora esto debería devolver solo canchas activas de la sede seleccionada
        console.log('Canchas activas cargadas para la sede seleccionada:', this.canchas);
      },
      error: (err) => {
        console.error('Error al cargar canchas activas:', err);
      }
    });
  }


  findSedeById(id: number): Sede | undefined {
    return this.sedes.find(sede => sede.id == id);
  }

  findCanchaById(id: number): Cancha | undefined {
    console.log('valida seleccion cancha',id);
    return this.canchas.find(cancha => cancha.id == id);
  }

  findCanchaPrecio(id: number): number {
    console.log('Valida precio de cancha');
    const cancha = this.canchas.find(cancha => cancha.id ==id);
    if (!cancha) {
        throw new Error('Cancha no encontrada');
    }
    return cancha.precio;
}


onSubmit() {
  console.log('Ingresando al método onSubmit');

  if (this.selectedSede !== null && this.selectedCancha !== null) {
    const sede = this.findSedeById(this.selectedSede);
    const cancha = this.findCanchaById(this.selectedCancha);
    const precio = this.findCanchaPrecio(this.selectedCancha) ?? 0;

    console.log('Sede y cancha seleccionadas:', sede, cancha);

    if (sede && cancha) {
      this.reserva.sede = sede;
      this.reserva.cancha = cancha;
      this.reserva.precioUnitario = precio;
      // Obtener el usuario logueado
      const currentUser = this.authService.currentUserValue?.email;
      if (currentUser) {
        // Obtener el usuario desde reservaService
        this.reservaService.getUsuario(currentUser).subscribe({
          next: user => {
            this.reserva.usuario = user; // Asigna el usuario completo a la reserva
            console.log('Usuario capturado:', user);
            // Muestra el contenido de la reserva antes de enviarla
            console.log('Datos de la reserva:', this.reserva);
            // Valida la reserva antes de enviarla
            if (this.validateReserva(this.reserva)) {
              this.reservaService.saveReserva(this.reserva).subscribe({
                next: response => {
                  console.log('Reserva registrada:', response);
                  Swal.fire({
                    title: 'Correcto!',
                    text: 'La reserva fue realizada de manera exitosa',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  });
                  this.volver();
                },
                error: err => {
                  console.error('Error al registrar la reserva:', err);
                  Swal.fire({
                    title: 'Error!',
                    text: 'Se producto un erro al registrar la reserva',
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                  });
                }
              });
            } else {
              console.error('Datos de reserva inválidos.');
              Swal.fire({
                title: 'Error!',
                text: 'Por favor completar correctamente le formulario',
                icon: 'error',
                confirmButtonText: 'Continuar'
              })
            }
          },
          error: err => {
            console.error('Error al obtener el usuario:', err);
          }
        });
      } else {
        console.error('Usuario no autenticado');
        return;
      }
    } else {
      console.error('Sede o cancha no encontrados.');
    }
  } else {
    console.error('Por favor, seleccione una sede y una cancha.');
    Swal.fire({
      title: 'Error!',
      text: 'Por favor, seleccione una sede y una cancha.',
      icon: 'error',
      confirmButtonText: 'Continuar'
    })
  }
}
volver(): void {
  this.router.navigate(['/MisReservas']);
}

validateReserva(reserva: Reserva): boolean {
  // Verifica que todos los campos requeridos estén presentes y sean válidos
  const isValidSede = reserva.sede !== null && reserva.sede !== undefined;
  const isValidCancha = reserva.cancha !== null && reserva.cancha !== undefined;
  const isValidUsuario = reserva.usuario !== null && reserva.usuario !== undefined;
  const isValidFecha = reserva.fecha !== '' && reserva.fecha !== null;
  const isValidHoraInicio = reserva.horaInicio !== '' && reserva.horaInicio !== null;
  const isValidHoraFin = reserva.horaFin !== '' && reserva.horaFin !== null;
  const isValidMedioPago = reserva.medioPago !== '' && reserva.medioPago !== null;
  const isValidCantidadHrs = reserva.cantidadHoras > 0;
  const isValidPrecioUnit = reserva.precioUnitario > 0;

  // Verifica que las horas de inicio y fin sean válidas
  const isHoraInicioValida = this.isHoraValida(reserva.horaInicio);
  const isHoraFinValida = this.isHoraValida(reserva.horaFin);

  // Retorna true si todas las validaciones son correctas
  return isValidSede &&
         isValidCancha &&
         isValidUsuario &&
         isValidFecha &&
         isValidHoraInicio &&
         isValidHoraFin &&
         isValidMedioPago &&
         isValidCantidadHrs &&
         isValidPrecioUnit &&
         isHoraInicioValida &&
         isHoraFinValida;
}

 // Método auxiliar para validar la hora
isHoraValida(hora: string): boolean {
  // Ejemplo de validación de hora en formato HH:mm
  const horaPattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return horaPattern.test(hora);
}


  selectHorarios() {
    const selected = this.horarios.filter(horario => horario.selected);

    if (selected.length > 0) {
      selected.sort((a, b) => this.parseTime(a.hora).getTime() - this.parseTime(b.hora).getTime());

      this.reserva.horaInicio = selected[0].hora;

      this.reserva.cantidadHoras=selected.length;

      this.cantidadHoras=this.reserva.cantidadHoras;

      this.updateCantidadHoras(this.cantidadHoras);
      const lastHoraFin = this.addTime(this.parseTime(selected[selected.length - 1].hora), 59, 59);

      this.reserva.horaFin = this.formatTime(lastHoraFin);

      console.log(`Horarios seleccionados: Inicio - ${this.reserva.horaInicio}, Fin - ${this.reserva.horaFin}`);
    } else {
      console.error('No se han seleccionado horarios.');
    }

    this.closeModal();
  }

  openHorariosModal(): void {
    if (this.selectedSede && this.selectedCancha && this.reserva.fecha) {
      this.reservaService.getHorariosDisponibles(this.selectedSede,this.selectedCancha,this.reserva.fecha).subscribe(data => {
        this.horarios = data;
        this.isModalVisible = true;
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, seleccione una sede , una cancha y fecha para poder seleccionar horario.',
        icon: 'error',
        confirmButtonText: 'Continuar'
      })

    }
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  parseTime(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  addTime(date: Date, minutes: number, seconds: number): Date {
    const newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() + minutes);
    newDate.setSeconds(date.getSeconds() + seconds);
    return newDate;
  }

  formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}


