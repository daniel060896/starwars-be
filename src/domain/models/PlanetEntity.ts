/**
 * Represents a planet with its various characteristics.
 * @class PlanetEntity
 */
export class PlanetEntity {
  /**
   * The name of the planet.
   * @type {string}
   */
  nombre: string;

  /**
   * The number of standard hours it takes for this planet
   *  to complete a single rotation on its axis.
   * @type {number}
   */
  periodoRotacion: number;

  /**
   * The number of standard days it takes for this planet
   * to complete a single orbit of its local star.
   * @type {number}
   */
  periodoOrbita: number;

  /**
   * The diameter of this planet in kilometers.
   * @type {number}
   */
  diametro: number;

  /**
   * The climate of this planet. Multiple climates
   * can be specified, separated by commas.
   * @type {string}
   */
  clima: string;

  /**
   * A string denoting the gravity of this planet,
   * where
   * "1" is normal or 1 standard G,
   * "2" is twice or 2 standard Gs,
   * and "0.5" is half or 0.5 standard Gs.
   * @type {string}
   */
  gravedad: string;

  /**
   * The terrain of this planet.
   * Multiple terrains can be specified,
   * separated by commas.
   * @type {string}
   */
  terreno: string;

  /**
   * The percentage of the planet's surface
   * that is naturally occurring water or bodies of water.
   * @type {number}
   */
  aguaSuperficial: number;

  /**
   * The average population of sentient
   * beings inhabiting this planet.
   * @type {number}
   */
  poblacion: number;

  /**
   * Constructor for the PlanetEntity class.
   * @param {string} nombre The name of the planet.
   * @param {number} periodoRotacion The rotation period of the planet in hours.
   * @param {number} periodoOrbita The orbital period of the planet in days.
   * @param {number} diametro The diameter of the planet in kilometers.
   * @param {string} clima The climate of the planet.
   * @param {string} gravedad The gravity of the planet.
   * @param {string} terreno The terrain of the planet.
   * @param {number} aguaSuperficial The percentage of surface water on the planet.
   * @param {number} poblacion The population of the planet.
   */
  constructor(
    nombre: string,
    periodoRotacion: number,
    periodoOrbita: number,
    diametro: number,
    clima: string,
    gravedad: string,
    terreno: string,
    aguaSuperficial: number,
    poblacion: number,
  ) {
    // Assign the provided parameters to the corresponding properties.
    this.nombre = nombre;
    this.periodoRotacion = periodoRotacion;
    this.periodoOrbita = periodoOrbita;
    this.diametro = diametro;
    this.clima = clima;
    this.gravedad = gravedad;
    this.terreno = terreno;
    this.aguaSuperficial = aguaSuperficial;
    this.poblacion = poblacion;
  }
}
