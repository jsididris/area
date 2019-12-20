FROM gradle:4.10.0-jdk8
USER root
ENV SDK_URL="https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip" \
    ANDROID_HOME="/usr/local/android-sdk" \
    ANDROID_VERSION=28 \
    ANDROID_BUILD_TOOLS_VERSION=27.0.3

WORKDIR /usr/src/app_mobile
RUN mkdir "$ANDROID_HOME" .android \
    && cd "$ANDROID_HOME" \
    && curl -o sdk.zip $SDK_URL \
    && unzip sdk.zip \
    && rm sdk.zip \
    && mkdir "$ANDROID_HOME/licenses" || true \
    && echo "24333f8a63b6825ea9c5514f83c2829b004d1fee" > "$ANDROID_HOME/licenses/android-sdk-license"

RUN $ANDROID_HOME/tools/bin/sdkmanager --update
RUN $ANDROID_HOME/tools/bin/sdkmanager "build-tools;${ANDROID_BUILD_TOOLS_VERSION}" \
    "platforms;android-${ANDROID_VERSION}" \
    "platform-tools"

RUN apt-get update && apt-get install build-essential -y && apt-get install file -y && apt-get install apt-utils -y
RUN apt-get update -yq \
        && apt-get install curl gnupg -yq \
        && curl -sL https://deb.nodesource.com/setup_8.x | bash \
        && apt-get install nodejs -yq

RUN npm install yarn -g --silent
COPY package*.json ./
RUN yarn install --silent

COPY . .
RUN cd android && ./gradlew assembleRelease && mkdir /usr/src/apk

CMD ["cp", "android/app/build/outputs/apk/release/app-release.apk", "/usr/src/apk/client.apk"]