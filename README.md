# 교환일기

두 명이 먼저 사용하는 비공개 교환일기 로컬 MVP.

## 사용 기술

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- SQLite

## 로컬 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 준비

프로젝트 루트에 `.env` 파일을 만들고 아래 내용을 넣습니다.

```env
DATABASE_URL="file:../data/database.db"
```

경로는 `prisma/` 디렉터리 기준 상대 경로입니다.

### 3. Prisma Client 생성 및 migration

```bash
npx prisma generate
npx prisma migrate dev
```

초기 migration 이름은 예시로 `init`을 사용할 수 있습니다.

### 4. Prisma seed

```bash
npx prisma db seed
```

`SystemCheck` 데이터가 없을 때만 확인용 레코드를 생성합니다. 같은 명령을 여러 번 실행해도 중복 생성되지 않습니다.

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속합니다.

## 데이터 저장 위치

- SQLite: `data/database.db`
- 업로드 파일: `data/uploads`

## 주의사항

- 실제 데이터베이스 파일은 GitHub에 업로드하지 않습니다.
- `.env`는 GitHub에 업로드하지 않습니다.
- 데이터 백업은 추후 별도로 구현 예정입니다.
