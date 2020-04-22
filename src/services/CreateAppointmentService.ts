import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;
  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  // only method
  public execute({ date, provider }: Request): Appointment {
    const AppointmentDate = startOfHour(date);

    const findAppointmentAtSameDate = this.appointmentsRepository.findByDate(
      AppointmentDate,
    );

    if (findAppointmentAtSameDate) {
      throw Error('Date already booked, sorry');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: AppointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
