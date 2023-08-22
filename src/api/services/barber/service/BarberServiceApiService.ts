import { BarberServiceQuery } from './BarberServiceQuery';
import { BarberServicesQuery } from './BarberServicesQuery';
import { BarberServicesExport } from './BarberServicesExport';
import { BarberServicesOrderMutation } from './BarberServicesOrderMutation';
import { BarberServiceAddMutation } from './BarberServiceAddMutation';
import { BarberServiceDeleteMutation } from './BarberServiceDeleteMutation';
import { BarberServiceUpdateMutation } from './BarberServiceUpdateMutation';

export class BarberServiceApiService {
  static barberServiceQuery = new BarberServiceQuery();
  static barberServicesQuery = new BarberServicesQuery();
  static barberServicesExport = new BarberServicesExport();
  static updateBarberServicesOrder = new BarberServicesOrderMutation();
  static barberServiceAdd = new BarberServiceAddMutation();
  static barberServiceDelete = new BarberServiceDeleteMutation();
  static barberServiceUpdate = new BarberServiceUpdateMutation();
}
