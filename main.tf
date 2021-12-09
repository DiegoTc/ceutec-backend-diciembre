terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "ceutec"
  region  = "us-east-2"
}

resource "aws_s3_bucket_object" "server" {
  bucket = "ceutec-ejercicio-clase-9-dic"
  key    = "server.js"
  source = "server.js"
  etag = "${filemd5("server.js")}"
}

resource "aws_s3_bucket_object" "package" {
  bucket = "ceutec-ejercicio-clase-9-dic"
  key    = "package.json"
  source = "package.json"
  etag = "${filemd5("package.json")}"
}

resource "aws_instance" "web" {
  ami           = "ami-0dd0ccab7e2801812"
  instance_type = "t2.micro"
  iam_instance_profile = "List_S3"
#  depends_on = [
#    aws_s3_bucket_object.server,
#    aws_s3_bucket_object.package
#  ]
  tags = {
    Name = "HelloWorld"
  }
  user_data = <<EOF
  #!/bin/bash
  sudo yum update -y
  sudo yum install git -y
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
  #https://stackoverflow.com/questions/54415841/nodejs-not-installed-successfully-in-aws-ec2-inside-user-data
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm install 7
  nvm install node -y
  node -e "console.log('Running Node.js ' + process.version)"
  #mkdir /tmp/proyecto #Comando para crear carpetas
  sudo aws s3 cp s3://ceutec-ejercicio-clase-9-dic/server.js anibal.js
  sudo aws s3 cp s3://ceutec-ejercicio-clase-9-dic/package.json package.json
  pwd
  npm install -g pm2
  npm install
  pm2 start anibal.js
  EOF
}

resource "aws_security_group" "grupomw" {
  name = "clase-8-dic"
  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_eip" "bar" {
  instance                  = aws_instance.web.id
}
