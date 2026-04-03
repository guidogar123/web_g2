import { ImageResponse } from 'next/og';

export const alt = 'G2 Intelligence — IA para Empresas en Cali, Colombia';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '1200px',
          height: '630px',
          backgroundColor: '#050505',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '4px',
            backgroundColor: '#10b981',
            marginBottom: '48px',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontSize: '72px',
              fontWeight: '700',
              color: '#10b981',
              margin: '0 0 16px 0',
              letterSpacing: '-1px',
            }}
          >
            G2 Intelligence
          </p>

          <p
            style={{
              fontSize: '34px',
              fontWeight: '400',
              color: '#ffffff',
              margin: '0 0 32px 0',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: '1.3',
            }}
          >
            IA que Transforma Empresas en Colombia
          </p>

          <p
            style={{
              fontSize: '22px',
              color: '#6b7280',
              margin: '0',
            }}
          >
            Cali — Valle del Cauca
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
