# `ai-hompy` 프로젝트에 `spec-kit` 설정 계획

## 1. 개요
`spec-kit`은 프로젝트에 파일을 복사하는 방식이 아닌, `specify-cli`라는 CLI 도구를 설치하여 사용하는 방식입니다. 이 계획은 `ai-hompy` 프로젝트에 `spec-kit`을 올바르게 설정하는 단계를 안내합니다.

## 2. 실행 계획

### 단계 1: `specify-cli` 설치
`README.md` 파일의 권장 사항에 따라 `uv`를 사용하여 `specify-cli`를 시스템에 설치합니다.

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

### 단계 2: `ai-hompy` 프로젝트 초기화
`ai-hompy` 디렉토리 내에서 `specify init` 명령어를 실행하여 프로젝트를 초기화합니다. `--here` 플래그를 사용하여 현재 디렉토리에 바로 설정 파일을 생성합니다.

```bash
specify init --here
```
이 명령을 실행하면 `.specify` 폴더와 관련 스크립트들이 프로젝트 루트에 생성됩니다.

### 단계 3: 불필요한 `spec-kit` 소스 코드 폴더 삭제
프로젝트 초기화가 완료되면, 처음에 클론했던 `spec-kit` 폴더는 더 이상 필요 없으므로 삭제하여 혼동을 방지합니다.

```bash
rm -rf spec-kit
```

## 3. 예상 결과
위 단계를 모두 마치면 `ai-hompy` 프로젝트는 `spec-kit`을 사용할 준비가 완료됩니다. 프로젝트 루트에는 `.specify` 디렉토리가 생성되고, `/constitution`, `/specify` 등의 명령어를 사용할 수 있게 됩니다.
