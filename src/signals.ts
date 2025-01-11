
export type signalHandler = (data : any) => Promise<void> 
const buffer : Map<string, signalHandler[]> = new Map()

/**
 * Set a new signal
 */
export function setSignal() : string {
  const id = uuidv4()
  buffer.set(id, [])
  return id
}

/**
 * Connect a function to a signal
 * @param id The signal id
 * @param handler The signal handler function
 */
export function connectToSignal(id : string, handler : signalHandler) {
    
  if(false == buffer.has(id)) {
    console.error(`Error connecting: The signal ${id} does not exist.`)
    return
  }

  buffer.get(id).push(handler)
}

/**
 * Emit a signal with the given dat 
 */
export async function emitSignal(id : string , data: any){

  if(false == buffer.has(id))
    return

  const targets = buffer.get(id)

  for (const target of targets) {
    target(data)
  }
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}
