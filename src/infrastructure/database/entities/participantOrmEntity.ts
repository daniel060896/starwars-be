import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("participant")
export class ParticipantOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 32 })
  firstName: string;

  @Column({ length: 32 })
  lastName: string;

  @Column()
  birthdate: Date;
}
