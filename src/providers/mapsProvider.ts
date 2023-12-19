import appConfig from "src/config/app.config";
import { createClient } from '@google/maps';

export class MapsProvider {
  private readonly connections = {
    PA: ['AM', 'MT', 'TO', 'AP', 'MA'],
    AM: ['RR', 'AC', 'RO', 'MT', 'PA'],
    MT: ['TO', 'GO', 'MS', 'PA', 'RO', 'AM'],
    TO: ['PA', 'MT', 'GO', 'PI', 'MA'],
    AP: ['PA'],
    MA: ['PA', 'TO', 'PI'],
    GO: ['MT', 'MS', 'MG', 'BA', 'TO'],
    MS: ['MT', 'GO', 'MG', 'SP', 'PR'],
    PR: ['SC', 'SP'],
    SC: ['PR'],
    SP: ['RJ', 'MG'],
    MG: ['ES', 'RJ', 'SP', 'BA', 'GO', 'MS', 'DF'],
    ES: ['BA', 'MG', 'RJ'],
    RJ: ['ES', 'MG', 'SP'],
    DF: ['GO'],
    BA: ['SE', 'PE', 'PI', 'TO', 'MG', 'ES'],
    AL: ['SE', 'PE'],
    SE: ['BA', 'AL'],
    PE: ['PB', 'CE', 'BA'],
    PB: ['RN', 'CE'],
    CE: ['RN', 'PB', 'PI'],
    RN: ['CE', 'PB'],
    PI: ['CE', 'BA'],
    AC: ['AM'],
    RR: ['AM'],
    RO: ['AC', 'AM', 'MT'],
  };;
  constructor() {}

  async defineRoute(from: string, to: string) {
    const queue = [];
    const visited = new Set()
    
    queue.push([from, [from]])

    while(queue.length > 0) {
      const [ province, actualDirection ] = queue.shift()
      
      if(province === to) return actualDirection

      if(!visited.has(province)) visited.add(province)
      
      for(const nextState of this.connections[province]) {
        if(!visited.has(nextState)) {
          const newDirection = actualDirection.concat(nextState)
          queue.push([nextState, newDirection])
          
        }
      }
    }
  }

  async createRoute(from: string, to: string, visited = new Set()): Promise<any> {
    if (from === to) {
      return [from];
    }
    visited.add(from);

    for (const province of this.connections[from]) {
      if (!visited.has(province)) {
        const partial = await this.createRoute(province, to, visited);
        if (partial) {
          return [from, ...partial];
        }
      }
    }

    visited.delete(from);
    return new Set(visited);

  }
}
