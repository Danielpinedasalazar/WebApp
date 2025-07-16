const encoder = new TextEncoder();

// Validamos que la variable exista y tenga contenido
const envKey = process.env.ENCRYPTION_KEY;

if (!envKey || envKey.trim() === '') {
  throw new Error(
    'ENCRYPTION_KEY is not defined or is empty in the environment variables'
  );
}

const key = encoder.encode(envKey);

// Función para hashear una contraseña con HMAC-SHA-256
export const hash = async (plainPassword: string): Promise<string> => {
  const passwordData = encoder.encode(plainPassword);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );

  const hashBuffer = await crypto.subtle.sign('HMAC', cryptoKey, passwordData);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

// Función para comparar una contraseña en texto plano con una ya cifrada
export const compare = async (
  plainPassword: string,
  encryptedPassword: string
): Promise<boolean> => {
  const hashedPassword = await hash(plainPassword);
  return hashedPassword === encryptedPassword;
};
